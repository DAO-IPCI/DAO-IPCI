/* eslint react/jsx-boolean-value: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Autosuggest from 'react-autosuggest'
import { translate } from 'react-i18next'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function getSuggestionValue(suggestion) {
  return suggestion.address;
}
function renderSuggestion(suggestion) {
  return (
    <span>
      {suggestion.name}<br />
      <small>{suggestion.address}</small>
    </span>
  );
}
function renderSectionTitle(section) {
  return (
    <strong>{section.name}</strong>
  );
}
function getSectionSuggestions(section) {
  return section.modules;
}

class Container extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onSuggestionsFetchRequested({ value }) {
    this.getSuggestions(value);
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    let suggestions = [];
    if (escapedValue !== '') {
      const regex = new RegExp('' + escapedValue, 'i');
      suggestions = _.map(this.props.items, section => (
        {
          name: section.name,
          modules: _.filter(
            section.modules,
            module => (regex.test(module.address) || regex.test(module.name))
          )
        }
      ))
        .filter(section => section.modules.length > 0);
    }
    this.setState({
      suggestions
    });
  }

  render() {
    const { field } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.t('autocompletePlaceholder'),
      value,
      ...field,
      onChange: (evt, { newValue }) => {
        field.onChange(newValue);
      },
    };
    const theme = {
      container: 'react-autosuggest__container',
      containerOpen: 'react-autosuggest__container--open',
      input: 'form-control',
      suggestionsContainer: 'react-autosuggest__suggestions-container',
      suggestionsList: 'react-autosuggest__suggestions-list',
      suggestion: 'react-autosuggest__suggestion',
      suggestionFocused: 'react-autosuggest__suggestion--focused',
      sectionContainer: 'react-autosuggest__section-container',
      sectionTitle: 'react-autosuggest__section-title'
    }

    return (<div className="react-autosuggest__container">
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        theme={theme}
      />
    </div>)
  }
}

function mapStateToProps(state, props) {
  const items = state.dao.blocks
  return {
    field: props.field,
    placeholder: props.placeholder,
    items
  }
}

export default connect(mapStateToProps)(translate()(Container))
