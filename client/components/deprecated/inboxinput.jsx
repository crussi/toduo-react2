const enterKeyCode = 13;

// Based on https://github.com/bevacqua/fuzzysearch
// This algorithm could definitely be made more accurate and flexible.
// Possibly consider full-text search like https://github.com/olivernn/lunr.js
function fuzzysearch(needle, haystack) {
    let hlen = haystack.length;
    let nlen = needle.length;

    if (nlen > hlen) {
        return false;
    }
    if (nlen === hlen) {
        return needle === haystack;
    }

    // "outer" is a label for the for loop referenced by continue. This is an
    // optimization for the V8 interpreter. This is *not* a "good part" of JS.
    // See Vyacheslav Egorov's graph: https://cloud.githubusercontent.com/assets/934293/6550014/d3a86174-c5fc-11e4-8334-b2e2b0d38fad.png.
    /*eslint no-labels: 0*/
    outer: for (let i = 0, j = 0; i < nlen; i++) {
        let nch = needle.charCodeAt(i);

        while (j < hlen) {
            if (haystack.charCodeAt(j++) === nch) {
                continue outer;
            }
        }

        return false;
    }

    return true;
}

// https://en.wikipedia.org/wiki/Levenshtein_distance
// This is a modification based on https://github.com/Glench/fuzzyset.js
function levenshtein(str1, str2) {
    let current = [];
    let prev;
    let value;

    str2.split('').forEach(function (str2Char, i) {
        str1.split('').forEach(function (str1Char, j) {
            if (str1.charAt(j - 1) === str2.charAt(i - 1)) {
                value = prev;
            } else {
                value = Math.min(current[j], current[j - 1], prev) + 1;
            }

            prev = current[j];
            current[j] = value || 0;
        });
    });

    return current.pop();
}

// Return an edit distance from 0 to 1 between str1 and str2.
function distance(str1, str2) {
    if (str1 === null && str2 === null) {
        throw 'Trying to compare two null values';
    }
    if (str1 === null || str2 === null) {
        return 0;
    }

    str1 = String(str1);
    str2 = String(str2);

    let d = levenshtein(str1, str2);

    if (str1.length > str2.length) {
        return 1 - d / str1.length;
    } else {
        return 1 - d / str2.length;
    }
}

// Compare `query` to the values in the array of suggestions and return an array
// of strings that contain `query` as a substring or partially matching substring.
function matches(query, suggestions) {
    if (query) {
        return suggestions.filter(function (suggestion) {
            return fuzzysearch(query.toLowerCase(), suggestion.toLowerCase());
        });
    } else {
        return []; // if input is empty, return no results
    }
}

// Map an array of strings to an array of objects that contain both the original
// string along with an associated distance which is the levenshtein distance
// between `query` and the string.
//
// This is an optimization so that the distance calculation is only ever done
// once per string so that the byDistance() sorting coparator (below) doesn't
// go crazy and lag the user's input.
function distanceToQuery(query) {
    return function (suggestion) {
        return {
            distance: distance(query.toLowerCase(), suggestion.toLowerCase()),
            value: suggestion
        };
    };
}

// Sort an array of objects created by distanceToQuery based on their distances.
function byDistance(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }

    return 0;
}

// A React component that quacks like an HTML <input> but which includes a
// selectable list of suggestions for filling in its value.
SuggestibleInput = React.createClass({
    contextTypes: {
        muiTheme: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            input: '',
            recentlyChoseSuggestion: false
        };
    },

    propTypes: {
        suggestions: React.PropTypes.array,
        maxSuggestions: React.PropTypes.number,
        onChange: React.PropTypes.func,
        value: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        clearOnSelect: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            suggestions: [],
            maxSuggestions: 10,
            value: undefined, // If no value is defined, then don't set a value.
            placeholder: '',
            clearOnSelect: false
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return nextProps.value === '' ||
            nextProps.value !== this.props.value ||
            nextState.input !== this.state.input ||
            nextState.recentlyChoseSuggestion !== this.state.recentlyChoseSuggestion;
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.value !== undefined) {
            this.setState({
                input: nextProps.value
            });
        }
    },

    // Whenever the text in the input changes, update the state's input and reset
    // recentlyChoseSuggestion to false so that the suggestions show up again.
    // Finally, if there was an onChange() callback passed in the props, call
    // that at the end so that the parent can update as expected.
    onChange: function (e) {
        let inputValue = this.refs.inputField.value;

        this.setState({
            input: inputValue,
            recentlyChoseSuggestion: false
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    // Simply call props.onKeyDown if it was defined, otherwise this component
    // doesn't do anything onKeyDown itself.
    onKeyDown: function (e) {
        if (e.keyCode === enterKeyCode) {
            this.clearInput();
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    },

    // When clicking outside the suggestion box area, force the component to
    // behave *as if* a suggestion had recently been chosen (i.e., hide the
    // suggestion drop-down selection).
    closeSuggestions: function (e) {
        e.preventDefault();

        this.setState({
            recentlyChoseSuggestion: true
        });
    },

    clearInput: function (e) {
        this.setState({
            input: '',
            recentlyChoseSuggestion: true
        });
    },

    chooseSuggestion: function (e) {
        e.preventDefault();

        let suggestion = e.target.dataset.suggestion;

        if (this.props.clearOnSelect) {
            this.clearInput();
        } else {
            this.setState({
                input: suggestion,
                recentlyChoseSuggestion: true
            });
        }

        // If the caller has specified a callback for onChoose, call that after
        // selecting a new suggestion, otherwise, focus on the input field with
        // the newly populated suggestion.
        if (this.props.onChoose) {
            this.props.onChoose(suggestion);
        }
    },

    // Show "x" for clearing search field only if it isn't currently blank.
    clearIsDisabled: function () {
        return this.state.input ? '' : 'disabled';
    },

    // Return an array of JSX elements based on any matches in
    // this.props.suggestions to the value of input.
    // Sort by simple heuristic: if input is closer to the beginning of the suggestion string
    // (e.g., "Toronto" should be more relevant than "Victoria" for the input "tor").
    renderSuggestions: function (input) {
        let clickHandler = this.chooseSuggestion;

        return matches(input, this.props.suggestions)
            .map(distanceToQuery(input))
            .sort(byDistance)
            .slice(0, this.props.maxSuggestions)
            .map(function (suggestion, i) {
                return (
                    <li
                        onClick={clickHandler}
                        key={i}
                        data-suggestion={suggestion.value}>
                        {suggestion.value}
                    </li>
                );
            });
    },

    render: function () {
        let suggestionsHtml = '';

        if (!this.state.recentlyChoseSuggestion) {
            let suggestionsList = this.renderSuggestions(this.state.input);

            if (suggestionsList.length > 0) {
                suggestionsHtml = (
                    <div className="suggestible-input-suggestions">
                        <ul>
                            {suggestionsList}
                        </ul>
                        <div
                            onClick={this.closeSuggestions}
                            className="suggestible-input-bg"></div>
                    </div>
                );
            }
        }

        return (
            <div className="suggestible-input">
                <input
                    type="text"
                    className={this.props.className}
                    ref='inputField'
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    value={this.state.input}
                    placeholder={this.props.placeholder} />
                <button
                    className={`suggestible-input-clear ${this.clearIsDisabled()}`}
                    onClick={this.clearInput}></button>
                {suggestionsHtml}
            </div>
        );
    }
});
