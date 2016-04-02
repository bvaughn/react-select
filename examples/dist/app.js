require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _componentsContributors = require('./components/Contributors');

var _componentsContributors2 = _interopRequireDefault(_componentsContributors);

var _componentsCustomComponents = require('./components/CustomComponents');

var _componentsCustomComponents2 = _interopRequireDefault(_componentsCustomComponents);

var _componentsCustomRender = require('./components/CustomRender');

var _componentsCustomRender2 = _interopRequireDefault(_componentsCustomRender);

var _componentsMultiselect = require('./components/Multiselect');

var _componentsMultiselect2 = _interopRequireDefault(_componentsMultiselect);

var _componentsNumericSelect = require('./components/NumericSelect');

var _componentsNumericSelect2 = _interopRequireDefault(_componentsNumericSelect);

var _componentsCities = require('./components/Cities');

var _componentsCities2 = _interopRequireDefault(_componentsCities);

var _componentsStates = require('./components/States');

var _componentsStates2 = _interopRequireDefault(_componentsStates);

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsCities2['default'], { label: 'Cities' }),
	_react2['default'].createElement(_componentsStates2['default'], { label: 'States', searchable: true }),
	_react2['default'].createElement(_componentsMultiselect2['default'], { label: 'Multiselect' }),
	_react2['default'].createElement(_componentsContributors2['default'], { label: 'Contributors (Async)' }),
	_react2['default'].createElement(_componentsNumericSelect2['default'], { label: 'Numeric Values' }),
	_react2['default'].createElement(_componentsCustomRender2['default'], { label: 'Custom Render Methods' }),
	_react2['default'].createElement(_componentsCustomComponents2['default'], { label: 'Custom Placeholder, Option and Value Components' })
), document.getElementById('example'));
/*
<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
*/

},{"./components/Cities":2,"./components/Contributors":3,"./components/CustomComponents":4,"./components/CustomRender":5,"./components/Multiselect":6,"./components/NumericSelect":7,"./components/States":8,"react":undefined,"react-dom":undefined,"react-select":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualizedSelect = require('react-virtualized-select');

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

var DATA = require('../data/cities');

var CitiesField = _react2['default'].createClass({
	displayName: 'CitiesField',
	getInitialState: function getInitialState() {
		return {};
	},
	updateValue: function updateValue(newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render: function render() {
		var options = DATA.CITIES;
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				'Large Datasets'
			),
			_react2['default'].createElement(_reactVirtualizedSelect2['default'], { ref: 'citySelect',
				autofocus: true,
				options: options,
				simpleValue: true,
				clearable: true,
				name: 'select-city',
				value: this.state.selectValue,
				onChange: this.updateValue,
				searchable: true,
				labelKey: 'name',
				valueKey: 'name'
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'Uses ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized' },
					'react-virtualized'
				),
				' and ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized-select/' },
					'react-virtualized-select'
				),
				' to display a list of the world\'s 1,000 largest cities.'
			)
		);
	}
});

module.exports = CitiesField;

},{"../data/cities":9,"react":undefined,"react-virtualized-select":31}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var CONTRIBUTORS = require('../data/contributors');
var MAX_CONTRIBUTORS = 6;
var ASYNC_DELAY = 500;

var Contributors = _react2['default'].createClass({
	displayName: 'Contributors',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true,
			value: [CONTRIBUTORS[0]]
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value[0]
		});
	},
	getContributors: function getContributors(input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(function (i) {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS
		};
		setTimeout(function () {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor: function gotoContributor(value, event) {
		window.open('https://github.com/' + value.github);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoContributor, valueKey: 'github', labelKey: 'name', loadOptions: this.getContributors }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked'
			)
		);
	}
});

module.exports = Contributors;

},{"../data/contributors":10,"react":undefined,"react-select":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var USERS = require('../data/users');
var GRAVATAR_SIZE = 15;

var GravatarOption = _react2['default'].createClass({
	displayName: 'GravatarOption',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string,
		isDisabled: _react2['default'].PropTypes.bool,
		isFocused: _react2['default'].PropTypes.bool,
		isSelected: _react2['default'].PropTypes.bool,
		onFocus: _react2['default'].PropTypes.func,
		onSelect: _react2['default'].PropTypes.func,
		onUnfocus: _react2['default'].PropTypes.func,
		option: _react2['default'].PropTypes.object.isRequired
	},
	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter: function handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove: function handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	handleMouseLeave: function handleMouseLeave(event) {
		this.props.onUnfocus(this.props.option, event);
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: this.props.className,
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onMouseLeave: this.handleMouseLeave,
				title: this.props.option.title },
			_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.option.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
			this.props.children
		);
	}
});

var GravatarValue = _react2['default'].createClass({
	displayName: 'GravatarValue',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		placeholder: _react2['default'].PropTypes.string,
		value: _react2['default'].PropTypes.object
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: 'Select-value', title: this.props.value.title },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-value-label' },
				_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.value.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
				this.props.children
			)
		);
	}
});

var UsersField = _react2['default'].createClass({
	displayName: 'UsersField',

	propTypes: {
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	render: function render() {
		var placeholder = _react2['default'].createElement(
			'span',
			null,
			'☺ Select User'
		);

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onChange: this.setValue,
				optionComponent: GravatarOption,
				options: USERS,
				placeholder: placeholder,
				value: this.state.value,
				valueComponent: GravatarValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom Option and Value components to render a Gravatar image for each user based on their email. It also demonstrates rendering HTML elements as the placeholder.'
			)
		);
	}
});

module.exports = UsersField;

},{"../data/users":12,"react":undefined,"react-gravatar":28,"react-select":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var DisabledUpsellOptions = _react2['default'].createClass({
	displayName: 'DisabledUpsellOptions',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
		console.log('Support level selected:', value.label);
	},
	renderLink: function renderLink() {
		return _react2['default'].createElement(
			'a',
			{ style: { marginLeft: 5 }, href: '/upgrade', target: '_blank' },
			'Upgrade here!'
		);
	},
	renderOption: function renderOption(option) {
		return _react2['default'].createElement(
			'span',
			{ style: { color: option.color } },
			option.label,
			' ',
			option.link
		);
	},
	renderValue: function renderValue(option) {
		return _react2['default'].createElement(
			'strong',
			{ style: { color: option.color } },
			option.label
		);
	},
	render: function render() {
		var options = [{ label: 'Basic customer support', value: 'basic', color: '#E31864' }, { label: 'Premium customer support', value: 'premium', color: '#6216A3' }, { label: 'Pro customer support', value: 'pro', disabled: true, link: this.renderLink() }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				placeholder: 'Select your support level',
				options: options,
				optionRenderer: this.renderOption,
				onChange: this.setValue,
				value: this.state.value,
				valueRenderer: this.renderValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This demonstates custom render methods and links in disabled options'
			)
		);
	}
});
module.exports = DisabledUpsellOptions;

},{"react":undefined,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var FLAVOURS = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Caramel', value: 'caramel' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];

var WHY_WOULD_YOU = [{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true }].concat(FLAVOURS.slice(1));

var MultiSelectField = _react2['default'].createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: []
		};
	},
	handleSelectChange: function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
		this.setState({ value: value });
	},
	toggleDisabled: function toggleDisabled(e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate: function toggleChocolate(e) {
		var crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS
		});
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, simpleValue: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: this.state.options, onChange: this.handleSelectChange }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.disabled, onChange: this.toggleDisabled }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disable the control'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.crazy, onChange: this.toggleChocolate }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'I don\'t like Chocolate (disabled the option)'
					)
				)
			)
		);
	}
});

module.exports = MultiSelectField;

},{"react":undefined,"react-select":undefined}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var ValuesAsNumbersField = _react2['default'].createClass({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			options: [{ value: 10, label: 'Ten' }, { value: 11, label: 'Eleven' }, { value: 12, label: 'Twelve' }, { value: 23, label: 'Twenty-three' }, { value: 24, label: 'Twenty-four' }],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false
		};
	},
	onChangeMatchStart: function onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},
	onChangeMatchValue: function onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},
	onChangeMatchLabel: function onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
	},
	onChange: function onChange(value) {
		this.setState({ value: value });
		console.log('Numeric Select value changed to', value);
	},
	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	render: function render() {
		var matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				matchPos: this.state.matchPos,
				matchProp: matchProp,
				multi: this.state.multi,
				onChange: this.onChange,
				options: this.state.options,
				simpleValue: true,
				value: this.state.value
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchValue, onChange: this.onChangeMatchValue }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match value only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchLabel, onChange: this.onChangeMatchLabel }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match label only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchPos === 'start', onChange: this.onChangeMatchStart }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Only include matches from the start of the string'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses simple numeric values'
			)
		);
	}
});

module.exports = ValuesAsNumbersField;

},{"react":undefined,"react-select":undefined}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var STATES = require('../data/states');

var StatesField = _react2['default'].createClass({
	displayName: 'StatesField',
	propTypes: {
		label: _react2['default'].PropTypes.string,
		searchable: _react2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'States:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true
		};
	},
	switchCountry: function switchCountry(e) {
		var newCountry = e.target.value;
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function updateValue(newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},
	focusStateSelect: function focusStateSelect() {
		this.refs.stateSelect.focus();
	},
	toggleCheckbox: function toggleCheckbox(e) {
		var newState = {};
		newState[e.target.name] = e.target.checked;
		this.setState(newState);
	},
	render: function render() {
		var options = STATES[this.state.country];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { ref: 'stateSelect', autofocus: true, options: options, simpleValue: true, clearable: this.state.clearable, name: 'selected-state', disabled: this.state.disabled, value: this.state.selectValue, onChange: this.updateValue, searchable: this.state.searchable }),
			_react2['default'].createElement(
				'div',
				{ style: { marginTop: 14 } },
				_react2['default'].createElement(
					'button',
					{ type: 'button', onClick: this.focusStateSelect },
					'Focus Select'
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'searchable', checked: this.state.searchable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Searchable'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'disabled', checked: this.state.disabled, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disabled'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'clearable', checked: this.state.clearable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Clearable'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'AU', value: 'AU', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Australia'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'US', value: 'US', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'United States'
					)
				)
			)
		);
	}
});

module.exports = StatesField;

},{"../data/states":11,"react":undefined,"react-select":undefined}],9:[function(require,module,exports){
'use strict';

exports.CITIES = [{ name: 'Abilene' }, { name: 'Addison' }, { name: 'Akron' }, { name: 'Alameda' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albuquerque' }, { name: 'Alexandria' }, { name: 'Alexandria' }, { name: 'Alhambra' }, { name: 'Aliso Viejo' }, { name: 'Allen' }, { name: 'Allentown' }, { name: 'Alpharetta' }, { name: 'Altamonte Springs' }, { name: 'Altoona' }, { name: 'Amarillo' }, { name: 'Ames' }, { name: 'Anaheim' }, { name: 'Anchorage' }, { name: 'Anderson' }, { name: 'Ankeny' }, { name: 'Ann Arbor' }, { name: 'Annapolis' }, { name: 'Antioch' }, { name: 'Apache Junction' }, { name: 'Apex' }, { name: 'Apopka' }, { name: 'Apple Valley' }, { name: 'Apple Valley' }, { name: 'Appleton' }, { name: 'Arcadia' }, { name: 'Arlington' }, { name: 'Arlington Heights' }, { name: 'Arvada' }, { name: 'Asheville' }, { name: 'Athens-Clarke County' }, { name: 'Atlanta' }, { name: 'Atlantic City' }, { name: 'Attleboro' }, { name: 'Auburn' }, { name: 'Auburn' }, { name: 'Augusta-Richmond County' }, { name: 'Aurora' }, { name: 'Aurora' }, { name: 'Austin' }, { name: 'Aventura' }, { name: 'Avondale' }, { name: 'Azusa' }, { name: 'Bakersfield' }, { name: 'Baldwin Park' }, { name: 'Baltimore' }, { name: 'Barnstable Town' }, { name: 'Bartlett' }, { name: 'Bartlett' }, { name: 'Baton Rouge' }, { name: 'Battle Creek' }, { name: 'Bayonne' }, { name: 'Baytown' }, { name: 'Beaumont' }, { name: 'Beaumont' }, { name: 'Beavercreek' }, { name: 'Beaverton' }, { name: 'Bedford' }, { name: 'Bell Gardens' }, { name: 'Belleville' }, { name: 'Bellevue' }, { name: 'Bellevue' }, { name: 'Bellflower' }, { name: 'Bellingham' }, { name: 'Beloit' }, { name: 'Bend' }, { name: 'Bentonville' }, { name: 'Berkeley' }, { name: 'Berwyn' }, { name: 'Bethlehem' }, { name: 'Beverly' }, { name: 'Billings' }, { name: 'Biloxi' }, { name: 'Binghamton' }, { name: 'Birmingham' }, { name: 'Bismarck' }, { name: 'Blacksburg' }, { name: 'Blaine' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Blue Springs' }, { name: 'Boca Raton' }, { name: 'Boise City' }, { name: 'Bolingbrook' }, { name: 'Bonita Springs' }, { name: 'Bossier City' }, { name: 'Boston' }, { name: 'Boulder' }, { name: 'Bountiful' }, { name: 'Bowie' }, { name: 'Bowling Green' }, { name: 'Boynton Beach' }, { name: 'Bozeman' }, { name: 'Bradenton' }, { name: 'Brea' }, { name: 'Bremerton' }, { name: 'Brentwood' }, { name: 'Brentwood' }, { name: 'Bridgeport' }, { name: 'Bristol' }, { name: 'Brockton' }, { name: 'Broken Arrow' }, { name: 'Brookfield' }, { name: 'Brookhaven' }, { name: 'Brooklyn Park' }, { name: 'Broomfield' }, { name: 'Brownsville' }, { name: 'Bryan' }, { name: 'Buckeye' }, { name: 'Buena Park' }, { name: 'Buffalo' }, { name: 'Buffalo Grove' }, { name: 'Bullhead City' }, { name: 'Burbank' }, { name: 'Burien' }, { name: 'Burleson' }, { name: 'Burlington' }, { name: 'Burlington' }, { name: 'Burnsville' }, { name: 'Caldwell' }, { name: 'Calexico' }, { name: 'Calumet City' }, { name: 'Camarillo' }, { name: 'Cambridge' }, { name: 'Camden' }, { name: 'Campbell' }, { name: 'Canton' }, { name: 'Cape Coral' }, { name: 'Cape Girardeau' }, { name: 'Carlsbad' }, { name: 'Carmel' }, { name: 'Carol Stream' }, { name: 'Carpentersville' }, { name: 'Carrollton' }, { name: 'Carson' }, { name: 'Carson City' }, { name: 'Cary' }, { name: 'Casa Grande' }, { name: 'Casper' }, { name: 'Castle Rock' }, { name: 'Cathedral City' }, { name: 'Cedar Falls' }, { name: 'Cedar Hill' }, { name: 'Cedar Park' }, { name: 'Cedar Rapids' }, { name: 'Centennial' }, { name: 'Ceres' }, { name: 'Cerritos' }, { name: 'Champaign' }, { name: 'Chandler' }, { name: 'Chapel Hill' }, { name: 'Charleston' }, { name: 'Charleston' }, { name: 'Charlotte' }, { name: 'Charlottesville' }, { name: 'Chattanooga' }, { name: 'Chelsea' }, { name: 'Chesapeake' }, { name: 'Chesterfield' }, { name: 'Cheyenne' }, { name: 'Chicago' }, { name: 'Chico' }, { name: 'Chicopee' }, { name: 'Chino' }, { name: 'Chino Hills' }, { name: 'Chula Vista' }, { name: 'Cicero' }, { name: 'Cincinnati' }, { name: 'Citrus Heights' }, { name: 'Clarksville' }, { name: 'Clearwater' }, { name: 'Cleveland' }, { name: 'Cleveland' }, { name: 'Cleveland Heights' }, { name: 'Clifton' }, { name: 'Clovis' }, { name: 'Clovis' }, { name: 'Coachella' }, { name: 'Coconut Creek' }, { name: 'Coeur d\'Alene' }, { name: 'College Station' }, { name: 'Collierville' }, { name: 'Colorado Springs' }, { name: 'Colton' }, { name: 'Columbia' }, { name: 'Columbia' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Commerce City' }, { name: 'Compton' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Conroe' }, { name: 'Conway' }, { name: 'Coon Rapids' }, { name: 'Coppell' }, { name: 'Coral Gables' }, { name: 'Coral Springs' }, { name: 'Corona' }, { name: 'Corpus Christi' }, { name: 'Corvallis' }, { name: 'Costa Mesa' }, { name: 'Council Bluffs' }, { name: 'Covina' }, { name: 'Covington' }, { name: 'Cranston' }, { name: 'Crystal Lake' }, { name: 'Culver City' }, { name: 'Cupertino' }, { name: 'Cutler Bay' }, { name: 'Cuyahoga Falls' }, { name: 'Cypress' }, { name: 'Dallas' }, { name: 'Daly City' }, { name: 'Danbury' }, { name: 'Danville' }, { name: 'Danville' }, { name: 'Davenport' }, { name: 'Davie' }, { name: 'Davis' }, { name: 'Dayton' }, { name: 'Daytona Beach' }, { name: 'DeKalb' }, { name: 'DeSoto' }, { name: 'Dearborn' }, { name: 'Dearborn Heights' }, { name: 'Decatur' }, { name: 'Decatur' }, { name: 'Deerfield Beach' }, { name: 'Delano' }, { name: 'Delray Beach' }, { name: 'Deltona' }, { name: 'Denton' }, { name: 'Denver' }, { name: 'Des Moines' }, { name: 'Des Plaines' }, { name: 'Detroit' }, { name: 'Diamond Bar' }, { name: 'Doral' }, { name: 'Dothan' }, { name: 'Dover' }, { name: 'Downers Grove' }, { name: 'Downey' }, { name: 'Draper' }, { name: 'Dublin' }, { name: 'Dublin' }, { name: 'Dubuque' }, { name: 'Duluth' }, { name: 'Duncanville' }, { name: 'Dunwoody' }, { name: 'Durham' }, { name: 'Eagan' }, { name: 'East Lansing' }, { name: 'East Orange' }, { name: 'East Providence' }, { name: 'Eastvale' }, { name: 'Eau Claire' }, { name: 'Eden Prairie' }, { name: 'Edina' }, { name: 'Edinburg' }, { name: 'Edmond' }, { name: 'Edmonds' }, { name: 'El Cajon' }, { name: 'El Centro' }, { name: 'El Monte' }, { name: 'El Paso' }, { name: 'Elgin' }, { name: 'Elizabeth' }, { name: 'Elk Grove' }, { name: 'Elkhart' }, { name: 'Elmhurst' }, { name: 'Elyria' }, { name: 'Encinitas' }, { name: 'Enid' }, { name: 'Erie' }, { name: 'Escondido' }, { name: 'Euclid' }, { name: 'Eugene' }, { name: 'Euless' }, { name: 'Evanston' }, { name: 'Evansville' }, { name: 'Everett' }, { name: 'Everett' }, { name: 'Fairfield' }, { name: 'Fairfield' }, { name: 'Fall River' }, { name: 'Fargo' }, { name: 'Farmington' }, { name: 'Farmington Hills' }, { name: 'Fayetteville' }, { name: 'Fayetteville' }, { name: 'Federal Way' }, { name: 'Findlay' }, { name: 'Fishers' }, { name: 'Fitchburg' }, { name: 'Flagstaff' }, { name: 'Flint' }, { name: 'Florence' }, { name: 'Florence' }, { name: 'Florissant' }, { name: 'Flower Mound' }, { name: 'Folsom' }, { name: 'Fond du Lac' }, { name: 'Fontana' }, { name: 'Fort Collins' }, { name: 'Fort Lauderdale' }, { name: 'Fort Myers' }, { name: 'Fort Pierce' }, { name: 'Fort Smith' }, { name: 'Fort Wayne' }, { name: 'Fort Worth' }, { name: 'Fountain Valley' }, { name: 'Franklin' }, { name: 'Frederick' }, { name: 'Freeport' }, { name: 'Fremont' }, { name: 'Fresno' }, { name: 'Friendswood' }, { name: 'Frisco' }, { name: 'Fullerton' }, { name: 'Gainesville' }, { name: 'Gaithersburg' }, { name: 'Galveston' }, { name: 'Garden Grove' }, { name: 'Gardena' }, { name: 'Garland' }, { name: 'Gary' }, { name: 'Gastonia' }, { name: 'Georgetown' }, { name: 'Germantown' }, { name: 'Gilbert' }, { name: 'Gilroy' }, { name: 'Glendale' }, { name: 'Glendale' }, { name: 'Glendora' }, { name: 'Glenview' }, { name: 'Goodyear' }, { name: 'Goose Creek' }, { name: 'Grand Forks' }, { name: 'Grand Island' }, { name: 'Grand Junction' }, { name: 'Grand Prairie' }, { name: 'Grand Rapids' }, { name: 'Grapevine' }, { name: 'Great Falls' }, { name: 'Greeley' }, { name: 'Green Bay' }, { name: 'Greenacres' }, { name: 'Greenfield' }, { name: 'Greensboro' }, { name: 'Greenville' }, { name: 'Greenville' }, { name: 'Greenwood' }, { name: 'Gresham' }, { name: 'Grove City' }, { name: 'Gulfport' }, { name: 'Hackensack' }, { name: 'Hagerstown' }, { name: 'Hallandale Beach' }, { name: 'Haltom City' }, { name: 'Hamilton' }, { name: 'Hammond' }, { name: 'Hampton' }, { name: 'Hanford' }, { name: 'Hanover Park' }, { name: 'Harlingen' }, { name: 'Harrisburg' }, { name: 'Harrisonburg' }, { name: 'Hartford' }, { name: 'Hattiesburg' }, { name: 'Haverhill' }, { name: 'Hawthorne' }, { name: 'Hayward' }, { name: 'Hemet' }, { name: 'Hempstead' }, { name: 'Henderson' }, { name: 'Hendersonville' }, { name: 'Hesperia' }, { name: 'Hialeah' }, { name: 'Hickory' }, { name: 'High Point' }, { name: 'Highland' }, { name: 'Hillsboro' }, { name: 'Hilton Head Island' }, { name: 'Hoboken' }, { name: 'Hoffman Estates' }, { name: 'Hollywood' }, { name: 'Holyoke' }, { name: 'Homestead' }, { name: 'Honolulu' }, { name: 'Hoover' }, { name: 'Houston' }, { name: 'Huber Heights' }, { name: 'Huntersville' }, { name: 'Huntington' }, { name: 'Huntington Beach' }, { name: 'Huntington Park' }, { name: 'Huntsville' }, { name: 'Huntsville' }, { name: 'Hurst' }, { name: 'Hutchinson' }, { name: 'Idaho Falls' }, { name: 'Independence' }, { name: 'Indianapolis' }, { name: 'Indio' }, { name: 'Inglewood' }, { name: 'Iowa City' }, { name: 'Irvine' }, { name: 'Irving' }, { name: 'Jackson' }, { name: 'Jackson' }, { name: 'Jacksonville' }, { name: 'Jacksonville' }, { name: 'Janesville' }, { name: 'Jefferson City' }, { name: 'Jeffersonville' }, { name: 'Jersey City' }, { name: 'Johns Creek' }, { name: 'Johnson City' }, { name: 'Joliet' }, { name: 'Jonesboro' }, { name: 'Joplin' }, { name: 'Jupiter' }, { name: 'Jurupa Valley' }, { name: 'Kalamazoo' }, { name: 'Kannapolis' }, { name: 'Kansas City' }, { name: 'Kansas City' }, { name: 'Kearny' }, { name: 'Keizer' }, { name: 'Keller' }, { name: 'Kenner' }, { name: 'Kennewick' }, { name: 'Kenosha' }, { name: 'Kent' }, { name: 'Kentwood' }, { name: 'Kettering' }, { name: 'Killeen' }, { name: 'Kingsport' }, { name: 'Kirkland' }, { name: 'Kissimmee' }, { name: 'Knoxville' }, { name: 'Kokomo' }, { name: 'La Crosse' }, { name: 'La Habra' }, { name: 'La Mesa' }, { name: 'La Mirada' }, { name: 'La Puente' }, { name: 'La Quinta' }, { name: 'Lacey' }, { name: 'Lafayette' }, { name: 'Lafayette' }, { name: 'Laguna Niguel' }, { name: 'Lake Charles' }, { name: 'Lake Elsinore' }, { name: 'Lake Forest' }, { name: 'Lake Havasu City' }, { name: 'Lake Oswego' }, { name: 'Lakeland' }, { name: 'Lakeville' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lansing' }, { name: 'Laredo' }, { name: 'Largo' }, { name: 'Las Cruces' }, { name: 'Las Vegas' }, { name: 'Lauderhill' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawton' }, { name: 'Layton' }, { name: 'League City' }, { name: 'Lee\'s Summit' }, { name: 'Leesburg' }, { name: 'Lehi' }, { name: 'Lenexa' }, { name: 'Leominster' }, { name: 'Lewisville' }, { name: 'Lexington-Fayette' }, { name: 'Lima' }, { name: 'Lincoln' }, { name: 'Lincoln' }, { name: 'Lincoln Park' }, { name: 'Linden' }, { name: 'Little Rock' }, { name: 'Littleton' }, { name: 'Livermore' }, { name: 'Livonia' }, { name: 'Lodi' }, { name: 'Logan' }, { name: 'Lombard' }, { name: 'Lompoc' }, { name: 'Long Beach' }, { name: 'Longmont' }, { name: 'Longview' }, { name: 'Lorain' }, { name: 'Los Angeles' }, { name: 'Louisville/Jefferson County' }, { name: 'Loveland' }, { name: 'Lowell' }, { name: 'Lubbock' }, { name: 'Lynchburg' }, { name: 'Lynn' }, { name: 'Lynwood' }, { name: 'Macon' }, { name: 'Madera' }, { name: 'Madison' }, { name: 'Madison' }, { name: 'Malden' }, { name: 'Manassas' }, { name: 'Manchester' }, { name: 'Manhattan' }, { name: 'Mankato' }, { name: 'Mansfield' }, { name: 'Mansfield' }, { name: 'Manteca' }, { name: 'Maple Grove' }, { name: 'Maplewood' }, { name: 'Marana' }, { name: 'Margate' }, { name: 'Maricopa' }, { name: 'Marietta' }, { name: 'Marlborough' }, { name: 'Martinez' }, { name: 'Marysville' }, { name: 'McAllen' }, { name: 'McKinney' }, { name: 'Medford' }, { name: 'Medford' }, { name: 'Melbourne' }, { name: 'Memphis' }, { name: 'Menifee' }, { name: 'Mentor' }, { name: 'Merced' }, { name: 'Meriden' }, { name: 'Meridian' }, { name: 'Meridian' }, { name: 'Mesa' }, { name: 'Mesquite' }, { name: 'Methuen' }, { name: 'Miami' }, { name: 'Miami Beach' }, { name: 'Miami Gardens' }, { name: 'Middletown' }, { name: 'Middletown' }, { name: 'Midland' }, { name: 'Midland' }, { name: 'Midwest City' }, { name: 'Milford' }, { name: 'Milpitas' }, { name: 'Milwaukee' }, { name: 'Minneapolis' }, { name: 'Minnetonka' }, { name: 'Minot' }, { name: 'Miramar' }, { name: 'Mishawaka' }, { name: 'Mission' }, { name: 'Mission Viejo' }, { name: 'Missoula' }, { name: 'Missouri City' }, { name: 'Mobile' }, { name: 'Modesto' }, { name: 'Moline' }, { name: 'Monroe' }, { name: 'Monrovia' }, { name: 'Montclair' }, { name: 'Montebello' }, { name: 'Monterey Park' }, { name: 'Montgomery' }, { name: 'Moore' }, { name: 'Moorhead' }, { name: 'Moreno Valley' }, { name: 'Morgan Hill' }, { name: 'Mount Pleasant' }, { name: 'Mount Prospect' }, { name: 'Mount Vernon' }, { name: 'Mountain View' }, { name: 'Muncie' }, { name: 'Murfreesboro' }, { name: 'Murray' }, { name: 'Murrieta' }, { name: 'Muskegon' }, { name: 'Muskogee' }, { name: 'Nampa' }, { name: 'Napa' }, { name: 'Naperville' }, { name: 'Nashua' }, { name: 'Nashville-Davidson' }, { name: 'National City' }, { name: 'New Bedford' }, { name: 'New Berlin' }, { name: 'New Braunfels' }, { name: 'New Britain' }, { name: 'New Brunswick' }, { name: 'New Haven' }, { name: 'New Orleans' }, { name: 'New Rochelle' }, { name: 'New York' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newport Beach' }, { name: 'Newport News' }, { name: 'Newton' }, { name: 'Niagara Falls' }, { name: 'Noblesville' }, { name: 'Norfolk' }, { name: 'Normal' }, { name: 'Norman' }, { name: 'North Charleston' }, { name: 'North Las Vegas' }, { name: 'North Lauderdale' }, { name: 'North Little Rock' }, { name: 'North Miami' }, { name: 'North Miami Beach' }, { name: 'North Port' }, { name: 'North Richland Hills' }, { name: 'Northglenn' }, { name: 'Norwalk' }, { name: 'Norwalk' }, { name: 'Norwich' }, { name: 'Novato' }, { name: 'Novi' }, { name: 'O\'Fallon' }, { name: 'Oak Lawn' }, { name: 'Oak Park' }, { name: 'Oakland' }, { name: 'Oakland Park' }, { name: 'Oakley' }, { name: 'Ocala' }, { name: 'Oceanside' }, { name: 'Ocoee' }, { name: 'Odessa' }, { name: 'Ogden' }, { name: 'Oklahoma City' }, { name: 'Olathe' }, { name: 'Olympia' }, { name: 'Omaha' }, { name: 'Ontario' }, { name: 'Orange' }, { name: 'Orem' }, { name: 'Orland Park' }, { name: 'Orlando' }, { name: 'Ormond Beach' }, { name: 'Oro Valley' }, { name: 'Oshkosh' }, { name: 'Overland Park' }, { name: 'Owensboro' }, { name: 'Oxnard' }, { name: 'Pacifica' }, { name: 'Palatine' }, { name: 'Palm Bay' }, { name: 'Palm Beach Gardens' }, { name: 'Palm Coast' }, { name: 'Palm Desert' }, { name: 'Palm Springs' }, { name: 'Palmdale' }, { name: 'Palo Alto' }, { name: 'Panama City' }, { name: 'Paramount' }, { name: 'Park Ridge' }, { name: 'Parker' }, { name: 'Parma' }, { name: 'Pasadena' }, { name: 'Pasadena' }, { name: 'Pasco' }, { name: 'Passaic' }, { name: 'Paterson' }, { name: 'Pawtucket' }, { name: 'Peabody' }, { name: 'Peachtree Corners' }, { name: 'Pearland' }, { name: 'Pembroke Pines' }, { name: 'Pensacola' }, { name: 'Peoria' }, { name: 'Peoria' }, { name: 'Perris' }, { name: 'Perth Amboy' }, { name: 'Petaluma' }, { name: 'Pflugerville' }, { name: 'Pharr' }, { name: 'Phenix City' }, { name: 'Philadelphia' }, { name: 'Phoenix' }, { name: 'Pico Rivera' }, { name: 'Pine Bluff' }, { name: 'Pinellas Park' }, { name: 'Pittsburg' }, { name: 'Pittsburgh' }, { name: 'Pittsfield' }, { name: 'Placentia' }, { name: 'Plainfield' }, { name: 'Plainfield' }, { name: 'Plano' }, { name: 'Plantation' }, { name: 'Pleasanton' }, { name: 'Plymouth' }, { name: 'Pocatello' }, { name: 'Pomona' }, { name: 'Pompano Beach' }, { name: 'Pontiac' }, { name: 'Port Arthur' }, { name: 'Port Orange' }, { name: 'Port St. Lucie' }, { name: 'Portage' }, { name: 'Porterville' }, { name: 'Portland' }, { name: 'Portland' }, { name: 'Portsmouth' }, { name: 'Poway' }, { name: 'Prescott' }, { name: 'Prescott Valley' }, { name: 'Providence' }, { name: 'Provo' }, { name: 'Pueblo' }, { name: 'Puyallup' }, { name: 'Quincy' }, { name: 'Quincy' }, { name: 'Racine' }, { name: 'Raleigh' }, { name: 'Rancho Cordova' }, { name: 'Rancho Cucamonga' }, { name: 'Rancho Palos Verdes' }, { name: 'Rancho Santa Margarita' }, { name: 'Rapid City' }, { name: 'Reading' }, { name: 'Redding' }, { name: 'Redlands' }, { name: 'Redmond' }, { name: 'Redondo Beach' }, { name: 'Redwood City' }, { name: 'Reno' }, { name: 'Renton' }, { name: 'Revere' }, { name: 'Rialto' }, { name: 'Richardson' }, { name: 'Richland' }, { name: 'Richmond' }, { name: 'Richmond' }, { name: 'Rio Rancho' }, { name: 'Riverside' }, { name: 'Riverton' }, { name: 'Roanoke' }, { name: 'Rochester' }, { name: 'Rochester' }, { name: 'Rochester Hills' }, { name: 'Rock Hill' }, { name: 'Rock Island' }, { name: 'Rockford' }, { name: 'Rocklin' }, { name: 'Rockville' }, { name: 'Rockwall' }, { name: 'Rocky Mount' }, { name: 'Rogers' }, { name: 'Rohnert Park' }, { name: 'Romeoville' }, { name: 'Rosemead' }, { name: 'Roseville' }, { name: 'Roseville' }, { name: 'Roswell' }, { name: 'Roswell' }, { name: 'Round Rock' }, { name: 'Rowlett' }, { name: 'Roy' }, { name: 'Royal Oak' }, { name: 'Sacramento' }, { name: 'Saginaw' }, { name: 'Salem' }, { name: 'Salem' }, { name: 'Salina' }, { name: 'Salinas' }, { name: 'Salt Lake City' }, { name: 'Sammamish' }, { name: 'San Angelo' }, { name: 'San Antonio' }, { name: 'San Bernardino' }, { name: 'San Bruno' }, { name: 'San Buenaventura (Ventura)' }, { name: 'San Clemente' }, { name: 'San Diego' }, { name: 'San Francisco' }, { name: 'San Gabriel' }, { name: 'San Jacinto' }, { name: 'San Jose' }, { name: 'San Leandro' }, { name: 'San Luis Obispo' }, { name: 'San Marcos' }, { name: 'San Marcos' }, { name: 'San Mateo' }, { name: 'San Rafael' }, { name: 'San Ramon' }, { name: 'Sandy' }, { name: 'Sandy Springs' }, { name: 'Sanford' }, { name: 'Santa Ana' }, { name: 'Santa Barbara' }, { name: 'Santa Clara' }, { name: 'Santa Clarita' }, { name: 'Santa Cruz' }, { name: 'Santa Fe' }, { name: 'Santa Maria' }, { name: 'Santa Monica' }, { name: 'Santa Rosa' }, { name: 'Santee' }, { name: 'Sarasota' }, { name: 'Savannah' }, { name: 'Sayreville' }, { name: 'Schaumburg' }, { name: 'Schenectady' }, { name: 'Scottsdale' }, { name: 'Scranton' }, { name: 'Seattle' }, { name: 'Shakopee' }, { name: 'Shawnee' }, { name: 'Sheboygan' }, { name: 'Shelton' }, { name: 'Sherman' }, { name: 'Shoreline' }, { name: 'Shreveport' }, { name: 'Sierra Vista' }, { name: 'Simi Valley' }, { name: 'Sioux City' }, { name: 'Sioux Falls' }, { name: 'Skokie' }, { name: 'Smyrna' }, { name: 'Smyrna' }, { name: 'Somerville' }, { name: 'South Bend' }, { name: 'South Gate' }, { name: 'South Jordan' }, { name: 'South San Francisco' }, { name: 'Southaven' }, { name: 'Southfield' }, { name: 'Spanish Fork' }, { name: 'Sparks' }, { name: 'Spartanburg' }, { name: 'Spokane' }, { name: 'Spokane Valley' }, { name: 'Springdale' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'St. Charles' }, { name: 'St. Clair Shores' }, { name: 'St. Cloud' }, { name: 'St. Cloud' }, { name: 'St. George' }, { name: 'St. Joseph' }, { name: 'St. Louis' }, { name: 'St. Louis Park' }, { name: 'St. Paul' }, { name: 'St. Peters' }, { name: 'St. Petersburg' }, { name: 'Stamford' }, { name: 'Stanton' }, { name: 'State College' }, { name: 'Sterling Heights' }, { name: 'Stillwater' }, { name: 'Stockton' }, { name: 'Streamwood' }, { name: 'Strongsville' }, { name: 'Suffolk' }, { name: 'Sugar Land' }, { name: 'Summerville' }, { name: 'Sumter' }, { name: 'Sunnyvale' }, { name: 'Sunrise' }, { name: 'Surprise' }, { name: 'Syracuse' }, { name: 'Tacoma' }, { name: 'Tallahassee' }, { name: 'Tamarac' }, { name: 'Tampa' }, { name: 'Taunton' }, { name: 'Taylor' }, { name: 'Taylorsville' }, { name: 'Temecula' }, { name: 'Tempe' }, { name: 'Temple' }, { name: 'Terre Haute' }, { name: 'Texarkana' }, { name: 'Texas City' }, { name: 'The Colony' }, { name: 'Thornton' }, { name: 'Thousand Oaks' }, { name: 'Tigard' }, { name: 'Tinley Park' }, { name: 'Titusville' }, { name: 'Toledo' }, { name: 'Topeka' }, { name: 'Torrance' }, { name: 'Tracy' }, { name: 'Trenton' }, { name: 'Troy' }, { name: 'Troy' }, { name: 'Tucson' }, { name: 'Tulare' }, { name: 'Tulsa' }, { name: 'Turlock' }, { name: 'Tuscaloosa' }, { name: 'Tustin' }, { name: 'Twin Falls' }, { name: 'Tyler' }, { name: 'Union City' }, { name: 'Union City' }, { name: 'Upland' }, { name: 'Urbana' }, { name: 'Urbandale' }, { name: 'Utica' }, { name: 'Vacaville' }, { name: 'Valdosta' }, { name: 'Vallejo' }, { name: 'Valley Stream' }, { name: 'Vancouver' }, { name: 'Victoria' }, { name: 'Victorville' }, { name: 'Vineland' }, { name: 'Virginia Beach' }, { name: 'Visalia' }, { name: 'Vista' }, { name: 'Waco' }, { name: 'Walnut Creek' }, { name: 'Waltham' }, { name: 'Warner Robins' }, { name: 'Warren' }, { name: 'Warren' }, { name: 'Warwick' }, { name: 'Washington' }, { name: 'Waterbury' }, { name: 'Waterloo' }, { name: 'Watsonville' }, { name: 'Waukegan' }, { name: 'Waukesha' }, { name: 'Wausau' }, { name: 'Wauwatosa' }, { name: 'Wellington' }, { name: 'Weslaco' }, { name: 'West Allis' }, { name: 'West Covina' }, { name: 'West Des Moines' }, { name: 'West Haven' }, { name: 'West Jordan' }, { name: 'West New York' }, { name: 'West Palm Beach' }, { name: 'West Sacramento' }, { name: 'West Valley City' }, { name: 'Westerville' }, { name: 'Westfield' }, { name: 'Westland' }, { name: 'Westminster' }, { name: 'Westminster' }, { name: 'Weston' }, { name: 'Weymouth Town' }, { name: 'Wheaton' }, { name: 'Wheeling' }, { name: 'White Plains' }, { name: 'Whittier' }, { name: 'Wichita' }, { name: 'Wichita Falls' }, { name: 'Wilkes-Barre' }, { name: 'Wilmington' }, { name: 'Wilmington' }, { name: 'Wilson' }, { name: 'Winston-Salem' }, { name: 'Winter Garden' }, { name: 'Woburn' }, { name: 'Woodbury' }, { name: 'Woodland' }, { name: 'Woonsocket' }, { name: 'Worcester' }, { name: 'Wylie' }, { name: 'Wyoming' }, { name: 'Yakima' }, { name: 'Yonkers' }, { name: 'Yorba Linda' }, { name: 'York' }, { name: 'Youngstown' }, { name: 'Yuba City' }, { name: 'Yucaipa' }, { name: 'Yuma' }];

},{}],10:[function(require,module,exports){
'use strict';

module.exports = [{ github: 'jedwatson', name: 'Jed Watson' }, { github: 'bruderstein', name: 'Dave Brotherstone' }, { github: 'jossmac', name: 'Joss Mackison' }, { github: 'jniechcial', name: 'Jakub Niechciał' }, { github: 'craigdallimore', name: 'Craig Dallimore' }, { github: 'julen', name: 'Julen Ruiz Aizpuru' }, { github: 'dcousens', name: 'Daniel Cousens' }, { github: 'jgautsch', name: 'Jon Gautsch' }, { github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }];

},{}],11:[function(require,module,exports){
'use strict';

exports.AU = [{ value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' }, { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' }, { value: 'victoria', label: 'Victoria', className: 'State-Vic' }, { value: 'queensland', label: 'Queensland', className: 'State-Qld' }, { value: 'western-australia', label: 'Western Australia', className: 'State-WA' }, { value: 'south-australia', label: 'South Australia', className: 'State-SA' }, { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' }, { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' }];

exports.US = [{ value: 'AL', label: 'Alabama', disabled: true }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];

},{}],12:[function(require,module,exports){
'use strict';

module.exports = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],13:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],14:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],15:[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],16:[function(require,module,exports){
'use strict';

var canUseDOM = require('./inDOM');

var size;

module.exports = function (recalc) {
  if (!size || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};
},{"./inDOM":15}],17:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 * 
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],18:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],19:[function(require,module,exports){
module.exports = function() {
  var mediaQuery;
  if (typeof window !== "undefined" && window !== null) {
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
};

},{}],20:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if(typeof message == 'undefined')
      return;

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":13,"crypt":14,"is-buffer":18}],21:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))

},{"_process":22}],22:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],23:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],25:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":23,"./encode":24}],26:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"performance-now":21}],27:[function(require,module,exports){
module.exports = require('react/lib/shallowCompare');
},{"react/lib/shallowCompare":54}],28:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var React, isRetina, md5, querystring;

React = require('react');

md5 = require('md5');

querystring = require('querystring');

isRetina = require('is-retina');

module.exports = React.createClass({
  displayName: 'Gravatar',
  propTypes: {
    email: React.PropTypes.string,
    md5: React.PropTypes.string,
    size: React.PropTypes.number,
    rating: React.PropTypes.string,
    https: React.PropTypes.bool,
    "default": React.PropTypes.string,
    className: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      size: 50,
      rating: 'g',
      https: false,
      "default": "retro"
    };
  },
  render: function() {
    var base, hash, modernBrowser, query, retinaQuery, retinaSrc, src;
    base = this.props.https ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
    query = querystring.stringify({
      s: this.props.size,
      r: this.props.rating,
      d: this.props["default"]
    });
    retinaQuery = querystring.stringify({
      s: this.props.size * 2,
      r: this.props.rating,
      d: this.props["default"]
    });
    if (this.props.md5) {
      hash = this.props.md5;
    } else if (this.props.email) {
      hash = md5(this.props.email);
    } else {
      console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
      return React.createElement("script", null);
    }
    src = base + hash + "?" + query;
    retinaSrc = base + hash + "?" + retinaQuery;
    modernBrowser = true;
    if (typeof window !== "undefined" && window !== null) {
      modernBrowser = 'srcset' in document.createElement('img');
    }
    if (!modernBrowser && isRetina()) {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": retinaSrc,
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    } else {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": src,
        "srcSet": retinaSrc + " 2x",
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    }
  }
});

},{"is-retina":19,"md5":20,"querystring":25,"react":undefined}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualizedSelect = function (_Component) {
  _inherits(VirtualizedSelect, _Component);

  function VirtualizedSelect(props, context) {
    _classCallCheck(this, VirtualizedSelect);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualizedSelect).call(this, props, context));

    _this._renderMenu = _this._renderMenu.bind(_this);
    _this._rowRenderer = _this._rowRenderer.bind(_this);
    return _this;
  }

  _createClass(VirtualizedSelect, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactSelect2.default, _extends({}, this.props, {
        menuRenderer: this._renderMenu,
        menuStyle: { overflow: 'hidden' }
      }));
    }

    // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing

  }, {
    key: '_renderMenu',
    value: function _renderMenu(_ref) {
      var focusedOption = _ref.focusedOption;
      var focusOption = _ref.focusOption;
      var labelKey = _ref.labelKey;
      var options = _ref.options;
      var selectValue = _ref.selectValue;
      var valueArray = _ref.valueArray;
      var _props = this.props;
      var maxHeight = _props.maxHeight;
      var optionHeight = _props.optionHeight;
      var rowRenderer = _props.rowRenderer;

      var focusedOptionIndex = options.indexOf(focusedOption);
      var height = Math.min(maxHeight, options.length * optionHeight);
      var innerRowRenderer = rowRenderer || this._rowRenderer;

      function wrappedRowRenderer(index) {
        var option = options[index];

        return innerRowRenderer({ focusedOption: focusedOption, focusedOptionIndex: focusedOptionIndex, focusOption: focusOption, labelKey: labelKey, option: option, options: options, selectValue: selectValue, valueArray: valueArray });
      }

      return _react2.default.createElement(
        _reactVirtualized.AutoSizer,
        { disableHeight: true },
        function (_ref2) {
          var width = _ref2.width;
          return _react2.default.createElement(_reactVirtualized.VirtualScroll, {
            className: 'VirtualSelectGrid',
            height: height,
            rowHeight: optionHeight,
            rowRenderer: wrappedRowRenderer,
            rowsCount: options.length,
            scrollToIndex: focusedOptionIndex,
            width: width
          });
        }
      );
    }
  }, {
    key: '_rowRenderer',
    value: function _rowRenderer(_ref3) {
      var focusedOption = _ref3.focusedOption;
      var focusOption = _ref3.focusOption;
      var labelKey = _ref3.labelKey;
      var option = _ref3.option;
      var selectValue = _ref3.selectValue;
      var optionHeight = this.props.optionHeight;


      var className = option === focusedOption ? 'VirtualizedSelectOption VirtualizedSelectFocusedOption' : 'VirtualizedSelectOption';

      return _react2.default.createElement(
        'div',
        {
          className: className,
          onMouseOver: function onMouseOver() {
            return focusOption(option);
          },
          onClick: function onClick() {
            return selectValue(option);
          },
          style: {
            height: optionHeight
          }
        },
        option[labelKey]
      );
    }
  }]);

  return VirtualizedSelect;
}(_react.Component);

VirtualizedSelect.propTypes = {
  maxHeight: _react.PropTypes.number.isRequired,
  optionHeight: _react.PropTypes.number.isRequired,
  rowRenderer: _react.PropTypes.func
};
VirtualizedSelect.defaultProps = {
  maxHeight: 200,
  optionHeight: 35
};
exports.default = VirtualizedSelect;
},{"react":undefined,"react-select":undefined,"react-virtualized":52}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _VirtualizedSelect = require('./VirtualizedSelect');

var _VirtualizedSelect2 = _interopRequireDefault(_VirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualizedSelect2.default;
},{"./VirtualizedSelect":29}],31:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./VirtualizedSelect":30,"dup":30}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This HOC decorates a virtualized component and responds to arrow-key events by scrolling one row or column at a time.
 */

var ArrowKeyStepper = function (_Component) {
  _inherits(ArrowKeyStepper, _Component);

  function ArrowKeyStepper(props, context) {
    _classCallCheck(this, ArrowKeyStepper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrowKeyStepper).call(this, props, context));

    _this.state = {
      scrollToColumn: 0,
      scrollToRow: 0
    };

    _this._columnStartIndex = 0;
    _this._columnStopIndex = 0;
    _this._rowStartIndex = 0;
    _this._rowStopIndex = 0;

    _this._onKeyDown = _this._onKeyDown.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  _createClass(ArrowKeyStepper, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var _state = this.state;
      var scrollToColumn = _state.scrollToColumn;
      var scrollToRow = _state.scrollToRow;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          onKeyDown: this._onKeyDown
        },
        children({
          onSectionRendered: this._onSectionRendered,
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(event) {
      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var rowsCount = _props2.rowsCount;

      // The above cases all prevent default event event behavior.
      // This is to keep the grid from scrolling after the snap-to update.

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.min(this._rowStopIndex + 1, rowsCount - 1)
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.max(this._columnStartIndex - 1, 0)
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.min(this._columnStopIndex + 1, columnsCount - 1)
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.max(this._rowStartIndex - 1, 0)
          });
          break;
      }
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref) {
      var columnStartIndex = _ref.columnStartIndex;
      var columnStopIndex = _ref.columnStopIndex;
      var rowStartIndex = _ref.rowStartIndex;
      var rowStopIndex = _ref.rowStopIndex;

      this._columnStartIndex = columnStartIndex;
      this._columnStopIndex = columnStopIndex;
      this._rowStartIndex = rowStartIndex;
      this._rowStopIndex = rowStopIndex;
    }
  }]);

  return ArrowKeyStepper;
}(_react.Component);

ArrowKeyStepper.propTypes = {
  children: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  columnsCount: _react.PropTypes.number.isRequired,
  rowsCount: _react.PropTypes.number.isRequired
};
exports.default = ArrowKeyStepper;
},{"react":undefined,"react-addons-shallow-compare":27}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowKeyStepper = exports.default = undefined;

var _ArrowKeyStepper2 = require('./ArrowKeyStepper');

var _ArrowKeyStepper3 = _interopRequireDefault(_ArrowKeyStepper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ArrowKeyStepper3.default;
exports.ArrowKeyStepper = _ArrowKeyStepper3.default;
},{"./ArrowKeyStepper":32}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Decorator component that automatically adjusts the width and height of a single child.
 * Child component should not be declared as a child but should rather be specified by a `ChildComponent` property.
 * All other properties will be passed through to the child component.
 */

var AutoSizer = function (_Component) {
  _inherits(AutoSizer, _Component);

  function AutoSizer(props) {
    _classCallCheck(this, AutoSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoSizer).call(this, props));

    _this.state = {
      height: 0,
      width: 0
    };

    _this._onResize = _this._onResize.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._setRef = _this._setRef.bind(_this);
    return _this;
  }

  _createClass(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      this._detectElementResize = require('../vendor/detectElementResize');
      this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

      this._onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var disableHeight = _props.disableHeight;
      var disableWidth = _props.disableWidth;
      var _state = this.state;
      var height = _state.height;
      var width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };

      if (!disableHeight) {
        outerStyle.height = 0;
      }

      if (!disableWidth) {
        outerStyle.width = 0;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: this._setRef,
          onScroll: this._onScroll,
          style: outerStyle
        },
        children({ height: height, width: width })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var onResize = this.props.onResize;

      var _parentNode$getBoundi = this._parentNode.getBoundingClientRect();

      var height = _parentNode$getBoundi.height;
      var width = _parentNode$getBoundi.width;


      var style = getComputedStyle(this._parentNode);
      var paddingLeft = parseInt(style.paddingLeft, 10);
      var paddingRight = parseInt(style.paddingRight, 10);
      var paddingTop = parseInt(style.paddingTop, 10);
      var paddingBottom = parseInt(style.paddingBottom, 10);

      this.setState({
        height: height - paddingTop - paddingBottom,
        width: width - paddingLeft - paddingRight
      });

      onResize({ height: height, width: width });
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // Prevent detectElementResize library from being triggered by this scroll event.
      event.stopPropagation();
    }
  }, {
    key: '_setRef',
    value: function _setRef(autoSizer) {
      // In case the component has been unmounted
      this._parentNode = autoSizer && autoSizer.parentNode;
    }
  }]);

  return AutoSizer;
}(_react.Component);

AutoSizer.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, width }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Disable dynamic :height property */
  disableHeight: _react.PropTypes.bool,

  /** Disable dynamic :width property */
  disableWidth: _react.PropTypes.bool,

  /** Callback to be invoked on-resize: ({ height, width }) */
  onResize: _react.PropTypes.func.isRequired
};
AutoSizer.defaultProps = {
  onResize: function onResize() {}
};
exports.default = AutoSizer;
},{"../vendor/detectElementResize":53,"react":undefined,"react-addons-shallow-compare":27}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSizer = exports.default = undefined;

var _AutoSizer2 = require('./AutoSizer');

var _AutoSizer3 = _interopRequireDefault(_AutoSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AutoSizer3.default;
exports.AutoSizer = _AutoSizer3.default;
},{"./AutoSizer":34}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * High-order component that auto-calculates column-widths for `Grid` cells.
 */

var ColumnSizer = function (_Component) {
  _inherits(ColumnSizer, _Component);

  function ColumnSizer(props, context) {
    _classCallCheck(this, ColumnSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColumnSizer).call(this, props, context));

    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(ColumnSizer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props;
      var columnMaxWidth = _props.columnMaxWidth;
      var columnMinWidth = _props.columnMinWidth;
      var columnsCount = _props.columnsCount;
      var width = _props.width;


      if (columnMaxWidth !== prevProps.columnMaxWidth || columnMinWidth !== prevProps.columnMinWidth || columnsCount !== prevProps.columnsCount || width !== prevProps.width) {
        if (this._registeredChild) {
          this._registeredChild.recomputeGridSize();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var columnMaxWidth = _props2.columnMaxWidth;
      var columnMinWidth = _props2.columnMinWidth;
      var columnsCount = _props2.columnsCount;
      var width = _props2.width;


      var safeColumnMinWidth = columnMinWidth || 1;

      var safeColumnMaxWidth = columnMaxWidth ? Math.min(columnMaxWidth, width) : width;

      var columnWidth = width / columnsCount;
      columnWidth = Math.max(safeColumnMinWidth, columnWidth);
      columnWidth = Math.min(safeColumnMaxWidth, columnWidth);
      columnWidth = Math.floor(columnWidth);

      var adjustedWidth = Math.min(width, columnWidth * columnsCount);

      return children({
        adjustedWidth: adjustedWidth,
        getColumnWidth: function getColumnWidth() {
          return columnWidth;
        },
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(child) {
      if (child !== null && !(child instanceof _Grid2.default)) {
        throw Error('Unexpected child type registered; only Grid children are supported.');
      }

      this._registeredChild = child;

      if (this._registeredChild) {
        this._registeredChild.recomputeGridSize();
      }
    }
  }]);

  return ColumnSizer;
}(_react.Component);

ColumnSizer.propTypes = {
  /**
   * Function respondible for rendering a virtualized Grid.
   * This function should implement the following signature:
   * ({ adjustedWidth, getColumnWidth, registerChild }) => PropTypes.element
   *
   * The specified :getColumnWidth function should be passed to the Grid's :columnWidth property.
   * The :registerChild should be passed to the Grid's :ref property.
   * The :adjustedWidth property is optional; it reflects the lesser of the overall width or the width of all columns.
   */
  children: _react.PropTypes.func.isRequired,

  /** Optional maximum allowed column width */
  columnMaxWidth: _react.PropTypes.number,

  /** Optional minimum allowed column width */
  columnMinWidth: _react.PropTypes.number,

  /** Number of columns in Grid or FlexTable child */
  columnsCount: _react.PropTypes.number.isRequired,

  /** Width of Grid or FlexTable child */
  width: _react.PropTypes.number.isRequired
};
exports.default = ColumnSizer;
},{"../Grid":45,"react":undefined,"react-addons-shallow-compare":27}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSizer = exports.default = undefined;

var _ColumnSizer2 = require('./ColumnSizer');

var _ColumnSizer3 = _interopRequireDefault(_ColumnSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ColumnSizer3.default;
exports.ColumnSizer = _ColumnSizer3.default;
},{"./ColumnSizer":36}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCellRenderer = defaultCellRenderer;
exports.defaultCellDataGetter = defaultCellDataGetter;
exports.defaultHeaderRenderer = defaultHeaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SortIndicator = require('./SortIndicator');

var _SortIndicator2 = _interopRequireDefault(_SortIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Default cell renderer that displays an attribute as a simple string
 * You should override the column's cellRenderer if your data is some other type of object.
 */
function defaultCellRenderer(cellData, cellDataKey, rowData, rowIndex, columnData) {
  if (cellData === null || cellData === undefined) {
    return '';
  } else {
    return String(cellData);
  }
}

/**
 * Default accessor for returning a cell value for a given attribute.
 * This function expects to operate on either a vanilla Object or an Immutable Map.
 * You should override the column's cellDataGetter if your data is some other type of object.
 */
function defaultCellDataGetter(dataKey, rowData, columnData) {
  if (rowData.get instanceof Function) {
    return rowData.get(dataKey);
  } else {
    return rowData[dataKey];
  }
}

/**
 * Default table header renderer.
 */
function defaultHeaderRenderer(_ref) {
  var columnData = _ref.columnData;
  var dataKey = _ref.dataKey;
  var disableSort = _ref.disableSort;
  var label = _ref.label;
  var sortBy = _ref.sortBy;
  var sortDirection = _ref.sortDirection;

  var showSortIndicator = sortBy === dataKey;
  var children = [_react2.default.createElement(
    'div',
    {
      className: 'FlexTable__headerTruncatedText',
      key: 'label',
      title: label
    },
    label
  )];

  if (showSortIndicator) {
    children.push(_react2.default.createElement(_SortIndicator2.default, {
      key: 'SortIndicator',
      sortDirection: sortDirection
    }));
  }

  return children;
}

/**
 * Describes the header and cell contents of a table column.
 */

var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
  }

  return Column;
}(_react.Component);

Column.defaultProps = {
  cellDataGetter: defaultCellDataGetter,
  cellRenderer: defaultCellRenderer,
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: defaultHeaderRenderer
};
Column.propTypes = {
  /** Optional CSS class to apply to cell */
  cellClassName: _react.PropTypes.string,

  /**
   * Callback responsible for returning a cell's data, given its :dataKey
   * (dataKey: string, rowData: any): any
   */
  cellDataGetter: _react.PropTypes.func,

  /**
   * Callback responsible for rendering a cell's contents.
   * (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any): element
   */
  cellRenderer: _react.PropTypes.func,

  /** Optional additional data passed to this column's :cellDataGetter */
  columnData: _react.PropTypes.object,

  /** Uniquely identifies the row-data attribute correspnding to this cell */
  dataKey: _react.PropTypes.any.isRequired,

  /** If sort is enabled for the table at large, disable it for this column */
  disableSort: _react.PropTypes.bool,

  /** Flex grow style; defaults to 0 */
  flexGrow: _react.PropTypes.number,

  /** Flex shrink style; defaults to 1 */
  flexShrink: _react.PropTypes.number,

  /** Optional CSS class to apply to this column's header */
  headerClassName: _react.PropTypes.string,

  /**
   * Optional callback responsible for rendering a column header contents.
   * ({ columnData: object, dataKey: string, disableSort: boolean, label: string, sortBy: string, sortDirection: string }): PropTypes.node
   */
  headerRenderer: _react.PropTypes.func.isRequired,

  /** Header label for this column */
  label: _react.PropTypes.string,

  /** Maximum width of column; this property will only be used if :flexGrow is > 0. */
  maxWidth: _react.PropTypes.number,

  /** Minimum width of column. */
  minWidth: _react.PropTypes.number,

  /** Flex basis (width) for this column; This value can grow or shrink based on :flexGrow and :flexShrink properties. */
  width: _react.PropTypes.number.isRequired
};
exports.default = Column;
},{"./SortIndicator":41,"react":undefined}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FlexColumn = require('./FlexColumn');

var _FlexColumn2 = _interopRequireDefault(_FlexColumn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table component with fixed headers and virtualized rows for improved performance with large data sets.
 * This component expects explicit width, height, and padding parameters.
 */

var FlexTable = function (_Component) {
  _inherits(FlexTable, _Component);

  function FlexTable(props) {
    _classCallCheck(this, FlexTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlexTable).call(this, props));

    _this.state = {
      scrollbarWidth: 0
    };

    _this._createRow = _this._createRow.bind(_this);
    return _this;
  }

  /**
   * See Grid#recomputeGridSize
   */


  _createClass(FlexTable, [{
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var disableHeader = _props.disableHeader;
      var headerHeight = _props.headerHeight;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowClassName = _props.rowClassName;
      var rowHeight = _props.rowHeight;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;
      var scrollbarWidth = this.state.scrollbarWidth;


      var availableRowsHeight = height - headerHeight;

      // This row-renderer wrapper function is necessary in order to trigger re-render when the
      // sort-by or sort-direction have changed (else Grid will not see any props changes)
      var rowRenderer = function rowRenderer(index) {
        return _this2._createRow(index);
      };

      var rowClass = rowClassName instanceof Function ? rowClassName(-1) : rowClassName;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('FlexTable', className)
        },
        !disableHeader && _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('FlexTable__headerRow', rowClass),
            style: {
              height: headerHeight,
              paddingRight: scrollbarWidth,
              width: width
            }
          },
          this._getRenderedHeaderRow()
        ),
        _react2.default.createElement(_Grid2.default, {
          ref: 'Grid',
          className: 'FlexTable__Grid',
          columnWidth: width,
          columnsCount: 1,
          height: availableRowsHeight,
          noContentRenderer: noRowsRenderer,
          onScroll: function onScroll(_ref) {
            var clientHeight = _ref.clientHeight;
            var scrollHeight = _ref.scrollHeight;
            var scrollTop = _ref.scrollTop;
            return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
          },
          onSectionRendered: function onSectionRendered(_ref2) {
            var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
            var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
            var rowStartIndex = _ref2.rowStartIndex;
            var rowStopIndex = _ref2.rowStopIndex;
            return onRowsRendered({
              overscanStartIndex: rowOverscanStartIndex,
              overscanStopIndex: rowOverscanStopIndex,
              startIndex: rowStartIndex,
              stopIndex: rowStopIndex
            });
          },
          overscanRowsCount: overscanRowsCount,
          renderCell: function renderCell(_ref3) {
            var columnIndex = _ref3.columnIndex;
            var rowIndex = _ref3.rowIndex;
            return rowRenderer(rowIndex);
          },
          rowHeight: rowHeight,
          rowsCount: rowsCount,
          scrollToRow: scrollToIndex,
          scrollTop: scrollTop,
          width: width
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_createColumn',
    value: function _createColumn(column, columnIndex, rowData, rowIndex) {
      var _column$props = column.props;
      var cellClassName = _column$props.cellClassName;
      var cellDataGetter = _column$props.cellDataGetter;
      var columnData = _column$props.columnData;
      var dataKey = _column$props.dataKey;
      var cellRenderer = _column$props.cellRenderer;

      var cellData = cellDataGetter(dataKey, rowData, columnData);
      var renderedCell = cellRenderer(cellData, dataKey, rowData, rowIndex, columnData);

      var style = this._getFlexStyleForColumn(column);

      var title = typeof renderedCell === 'string' ? renderedCell : null;

      return _react2.default.createElement(
        'div',
        {
          key: 'Row' + rowIndex + '-Col' + columnIndex,
          className: (0, _classnames2.default)('FlexTable__rowColumn', cellClassName),
          style: style
        },
        _react2.default.createElement(
          'div',
          {
            className: 'FlexTable__truncatedColumnText',
            title: title
          },
          renderedCell
        )
      );
    }
  }, {
    key: '_createHeader',
    value: function _createHeader(column, columnIndex) {
      var _props2 = this.props;
      var headerClassName = _props2.headerClassName;
      var onHeaderClick = _props2.onHeaderClick;
      var sort = _props2.sort;
      var sortBy = _props2.sortBy;
      var sortDirection = _props2.sortDirection;
      var _column$props2 = column.props;
      var dataKey = _column$props2.dataKey;
      var disableSort = _column$props2.disableSort;
      var headerRenderer = _column$props2.headerRenderer;
      var label = _column$props2.label;
      var columnData = _column$props2.columnData;

      var sortEnabled = !disableSort && sort;

      var classNames = (0, _classnames2.default)('FlexTable__headerColumn', headerClassName, column.props.headerClassName, {
        'FlexTable__sortableHeaderColumn': sortEnabled
      });
      var style = this._getFlexStyleForColumn(column);

      // If this is a sortable header, clicking it should update the table data's sorting.
      var newSortDirection = sortBy !== dataKey || sortDirection === _SortDirection2.default.DESC ? _SortDirection2.default.ASC : _SortDirection2.default.DESC;
      var onClick = function onClick() {
        sortEnabled && sort(dataKey, newSortDirection);
        onHeaderClick(dataKey, columnData);
      };

      var renderedHeader = headerRenderer({
        columnData: columnData,
        dataKey: dataKey,
        disableSort: disableSort,
        label: label,
        sortBy: sortBy,
        sortDirection: sortDirection
      });

      return _react2.default.createElement(
        'div',
        {
          key: 'Header-Col' + columnIndex,
          className: classNames,
          style: style,
          onClick: onClick
        },
        renderedHeader
      );
    }
  }, {
    key: '_createRow',
    value: function _createRow(rowIndex) {
      var _this3 = this;

      var _props3 = this.props;
      var children = _props3.children;
      var onRowClick = _props3.onRowClick;
      var rowClassName = _props3.rowClassName;
      var rowGetter = _props3.rowGetter;
      var scrollbarWidth = this.state.scrollbarWidth;


      var rowClass = rowClassName instanceof Function ? rowClassName(rowIndex) : rowClassName;
      var rowData = rowGetter(rowIndex);

      var renderedRow = _react2.default.Children.map(children, function (column, columnIndex) {
        return _this3._createColumn(column, columnIndex, rowData, rowIndex);
      });

      return _react2.default.createElement(
        'div',
        {
          key: rowIndex,
          className: (0, _classnames2.default)('FlexTable__row', rowClass),
          onClick: function onClick() {
            return onRowClick(rowIndex);
          },
          style: {
            height: this._getRowHeight(rowIndex),
            paddingRight: scrollbarWidth
          }
        },
        renderedRow
      );
    }

    /**
     * Determines the flex-shrink, flex-grow, and width values for a cell (header or column).
     */

  }, {
    key: '_getFlexStyleForColumn',
    value: function _getFlexStyleForColumn(column) {
      var flexValue = column.props.flexGrow + ' ' + column.props.flexShrink + ' ' + column.props.width + 'px';

      var style = {
        flex: flexValue,
        msFlex: flexValue,
        WebkitFlex: flexValue
      };

      if (column.props.maxWidth) {
        style.maxWidth = column.props.maxWidth;
      }

      if (column.props.minWidth) {
        style.minWidth = column.props.minWidth;
      }

      return style;
    }
  }, {
    key: '_getRenderedHeaderRow',
    value: function _getRenderedHeaderRow() {
      var _this4 = this;

      var _props4 = this.props;
      var children = _props4.children;
      var disableHeader = _props4.disableHeader;

      var items = disableHeader ? [] : children;

      return _react2.default.Children.map(items, function (column, index) {
        return _this4._createHeader(column, index);
      });
    }
  }, {
    key: '_getRowHeight',
    value: function _getRowHeight(rowIndex) {
      var rowHeight = this.props.rowHeight;


      return rowHeight instanceof Function ? rowHeight(rowIndex) : rowHeight;
    }
  }, {
    key: '_setScrollbarWidth',
    value: function _setScrollbarWidth() {
      var Grid = (0, _reactDom.findDOMNode)(this.refs.Grid);
      var clientWidth = Grid.clientWidth || 0;
      var offsetWidth = Grid.offsetWidth || 0;
      var scrollbarWidth = offsetWidth - clientWidth;

      this.setState({ scrollbarWidth: scrollbarWidth });
    }
  }]);

  return FlexTable;
}(_react.Component);

FlexTable.propTypes = {
  /** One or more FlexColumns describing the data displayed in this row */
  children: function children(props, propName, componentName) {
    var children = _react2.default.Children.toArray(props.children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].type !== _FlexColumn2.default) {
        return new Error('FlexTable only accepts children of type FlexColumn');
      }
    }
  },

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Disable rendering the header at all */
  disableHeader: _react.PropTypes.bool,

  /** Optional CSS class to apply to all column headers */
  headerClassName: _react.PropTypes.string,

  /** Fixed height of header row */
  headerHeight: _react.PropTypes.number.isRequired,

  /** Fixed/available height for out DOM element */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of table body rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func,

  /**
  * Optional callback when a column's header is clicked.
  * (dataKey: string): void
  */
  onHeaderClick: _react.PropTypes.func,

  /**
   * Callback invoked when a user clicks on a table row.
   * (rowIndex: number): void
   */
  onRowClick: _react.PropTypes.func,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Optional CSS class to apply to all table rows (including the header row).
   * This property can be a CSS class name (string) or a function that returns a class name.
   * If a function is provided its signature should be: (rowIndex: number): string
   */
  rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /**
   * Callback responsible for returning a data row given an index.
   * (index: number): any
   */
  rowGetter: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Number of rows in table. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Sort function to be called if a sortable header is clicked.
   * (dataKey: string, sortDirection: SortDirection): void
   */
  sort: _react.PropTypes.func,

  /** FlexTable data is currently sorted by this :dataKey (if it is sorted at all) */
  sortBy: _react.PropTypes.string,

  /** FlexTable data is currently sorted in this direction (if it is sorted at all) */
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC]),

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
FlexTable.defaultProps = {
  disableHeader: false,
  headerHeight: 0,
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onHeaderClick: function onHeaderClick() {
    return null;
  },
  onRowClick: function onRowClick() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = FlexTable;
},{"../Grid":45,"./FlexColumn":38,"./SortDirection":40,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":27,"react-dom":undefined}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SortDirection = {
  /**
   * Sort items in ascending order.
   * This means arranging from the lowest value to the highest (e.g. a-z, 0-9).
   */
  ASC: 'ASC',

  /**
   * Sort items in descending order.
   * This means arranging from the highest value to the lowest (e.g. z-a, 9-0).
   */
  DESC: 'DESC'
};

exports.default = SortDirection;
},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SortIndicator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displayed beside a header to indicate that a FlexTable is currently sorted by this column.
 */
function SortIndicator(_ref) {
  var sortDirection = _ref.sortDirection;

  var classNames = (0, _classnames2.default)('FlexTable__sortableHeaderIcon', {
    'FlexTable__sortableHeaderIcon--ASC': sortDirection === _SortDirection2.default.ASC,
    'FlexTable__sortableHeaderIcon--DESC': sortDirection === _SortDirection2.default.DESC
  });

  return _react2.default.createElement(
    'svg',
    {
      className: classNames,
      width: 18,
      height: 18,
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    sortDirection === _SortDirection2.default.ASC ? _react2.default.createElement('path', { d: 'M7 14l5-5 5 5z' }) : _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' }),
    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
  );
}
SortIndicator.propTypes = {
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC])
};
},{"./SortDirection":40,"classnames":undefined,"react":undefined}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortIndicator = exports.SortDirection = exports.FlexColumn = exports.FlexTable = exports.default = undefined;

var _FlexTable2 = require('./FlexTable');

var _FlexTable3 = _interopRequireDefault(_FlexTable2);

var _FlexColumn2 = require('./FlexColumn');

var _FlexColumn3 = _interopRequireDefault(_FlexColumn2);

var _SortDirection2 = require('./SortDirection');

var _SortDirection3 = _interopRequireDefault(_SortDirection2);

var _SortIndicator2 = require('./SortIndicator');

var _SortIndicator3 = _interopRequireDefault(_SortIndicator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FlexTable3.default;
exports.FlexTable = _FlexTable3.default;
exports.FlexColumn = _FlexColumn3.default;
exports.SortDirection = _SortDirection3.default;
exports.SortIndicator = _SortIndicator3.default;
},{"./FlexColumn":38,"./FlexTable":39,"./SortDirection":40,"./SortIndicator":41}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GridUtils = require('./GridUtils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

/**
 * Renders tabular data with virtualization along the vertical and horizontal axes.
 * Row heights and column widths must be known ahead of time and specified as properties.
 */

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props, context) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props, context));

    _this.state = {
      computeGridMetadataOnNextUpdate: false,
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes onSectionRendered callback only when start/stop row or column indices change
    _this._onGridRenderedMemoizer = (0, _GridUtils.createCallbackMemoizer)();
    _this._onScrollMemoizer = (0, _GridUtils.createCallbackMemoizer)(false);

    // Bind functions to instance so they don't lose context when passed around
    _this._computeColumnMetadata = _this._computeColumnMetadata.bind(_this);
    _this._computeRowMetadata = _this._computeRowMetadata.bind(_this);
    _this._invokeOnGridRenderedHelper = _this._invokeOnGridRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._updateScrollLeftForScrollToColumn = _this._updateScrollLeftForScrollToColumn.bind(_this);
    _this._updateScrollTopForScrollToRow = _this._updateScrollTopForScrollToRow.bind(_this);
    return _this;
  }

  /**
   * Forced recompute of row heights and column widths.
   * This function should be called if dynamic column or row sizes have changed but nothing else has.
   * Since Grid only receives :columnsCount and :rowsCount it has no way of detecting when the underlying data changes.
   */


  _createClass(Grid, [{
    key: 'recomputeGridSize',
    value: function recomputeGridSize() {
      this.setState({
        computeGridMetadataOnNextUpdate: true
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var scrollLeft = _props.scrollLeft;
      var scrollToColumn = _props.scrollToColumn;
      var scrollTop = _props.scrollTop;
      var scrollToRow = _props.scrollToRow;


      this._scrollbarSize = (0, _scrollbarSize2.default)();

      if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      if (scrollToColumn >= 0 || scrollToRow >= 0) {
        this._updateScrollLeftForScrollToColumn();
        this._updateScrollTopForScrollToRow();
      }

      // Update onRowsRendered callback
      this._invokeOnGridRenderedHelper();

      // Initialize onScroll callback
      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalColumnsWidth: this._getTotalColumnsWidth(),
        totalRowsHeight: this._getTotalRowsHeight()
      });
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) New scroll-to-cell props have been set
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var columnWidth = _props2.columnWidth;
      var height = _props2.height;
      var rowHeight = _props2.rowHeight;
      var rowsCount = _props2.rowsCount;
      var scrollToColumn = _props2.scrollToColumn;
      var scrollToRow = _props2.scrollToRow;
      var width = _props2.width;
      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollPositionChangeReason = _state.scrollPositionChangeReason;
      var scrollTop = _state.scrollTop;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.

      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        if (scrollLeft >= 0 && scrollLeft !== prevState.scrollLeft && scrollLeft !== this.refs.scrollingContainer.scrollLeft) {
          this.refs.scrollingContainer.scrollLeft = scrollLeft;
        }
        if (scrollTop >= 0 && scrollTop !== prevState.scrollTop && scrollTop !== this.refs.scrollingContainer.scrollTop) {
          this.refs.scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Update scroll offsets if the current :scrollToColumn or :scrollToRow values requires it
      (0, _GridUtils.updateScrollIndexHelper)({
        cellsCount: columnsCount,
        cellMetadata: this._columnMetadata,
        cellSize: columnWidth,
        previousCellsCount: prevProps.columnsCount,
        previousCellSize: prevProps.columnWidth,
        previousScrollToIndex: prevProps.scrollToColumn,
        previousSize: prevProps.width,
        scrollOffset: scrollLeft,
        scrollToIndex: scrollToColumn,
        size: width,
        updateScrollIndexCallback: this._updateScrollLeftForScrollToColumn
      });
      (0, _GridUtils.updateScrollIndexHelper)({
        cellsCount: rowsCount,
        cellMetadata: this._rowMetadata,
        cellSize: rowHeight,
        previousCellsCount: prevProps.rowsCount,
        previousCellSize: prevProps.rowHeight,
        previousScrollToIndex: prevProps.scrollToRow,
        previousSize: prevProps.height,
        scrollOffset: scrollTop,
        scrollToIndex: scrollToRow,
        size: height,
        updateScrollIndexCallback: this._updateScrollTopForScrollToRow
      });

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnGridRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._computeColumnMetadata(this.props);
      this._computeRowMetadata(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.columnsCount === 0 && nextState.scrollLeft !== 0 || nextProps.rowsCount === 0 && nextState.scrollTop !== 0) {
        this._setScrollPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        this._setScrollPosition({
          scrollLeft: nextProps.scrollLeft,
          scrollTop: nextProps.scrollTop
        });
      }

      // Update scroll offsets if the size or number of cells have changed, invalidating the previous value
      (0, _GridUtils.computeCellMetadataAndUpdateScrollOffsetHelper)({
        cellsCount: this.props.columnsCount,
        cellSize: this.props.columnWidth,
        computeMetadataCallback: this._computeColumnMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.columnsCount,
        nextCellSize: nextProps.columnWidth,
        nextScrollToIndex: nextProps.scrollToColumn,
        scrollToIndex: this.props.scrollToColumn,
        updateScrollOffsetForScrollToIndex: this._updateScrollLeftForScrollToColumn
      });
      (0, _GridUtils.computeCellMetadataAndUpdateScrollOffsetHelper)({
        cellsCount: this.props.rowsCount,
        cellSize: this.props.rowHeight,
        computeMetadataCallback: this._computeRowMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.rowsCount,
        nextCellSize: nextProps.rowHeight,
        nextScrollToIndex: nextProps.scrollToRow,
        scrollToIndex: this.props.scrollToRow,
        updateScrollOffsetForScrollToIndex: this._updateScrollTopForScrollToRow
      });

      this.setState({
        computeGridMetadataOnNextUpdate: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var className = _props3.className;
      var columnsCount = _props3.columnsCount;
      var height = _props3.height;
      var noContentRenderer = _props3.noContentRenderer;
      var overscanColumnsCount = _props3.overscanColumnsCount;
      var overscanRowsCount = _props3.overscanRowsCount;
      var renderCell = _props3.renderCell;
      var rowsCount = _props3.rowsCount;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;


      var childrenToDisplay = [];

      // Render only enough columns and rows to cover the visible area of the grid.
      if (height > 0 && width > 0) {
        var visibleColumnIndices = (0, _GridUtils.getVisibleCellIndices)({
          cellsCount: columnsCount,
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft
        });

        var visibleRowIndices = (0, _GridUtils.getVisibleCellIndices)({
          cellsCount: rowsCount,
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop
        });

        // Store for _invokeOnGridRenderedHelper()
        this._renderedColumnStartIndex = visibleColumnIndices.start;
        this._renderedColumnStopIndex = visibleColumnIndices.stop;
        this._renderedRowStartIndex = visibleRowIndices.start;
        this._renderedRowStopIndex = visibleRowIndices.stop;

        var overscanColumnIndices = (0, _GridUtils.getOverscanIndices)({
          cellsCount: columnsCount,
          overscanCellsCount: overscanColumnsCount,
          startIndex: this._renderedColumnStartIndex,
          stopIndex: this._renderedColumnStopIndex
        });

        var overscanRowIndices = (0, _GridUtils.getOverscanIndices)({
          cellsCount: rowsCount,
          overscanCellsCount: overscanRowsCount,
          startIndex: this._renderedRowStartIndex,
          stopIndex: this._renderedRowStopIndex
        });

        // Store for _invokeOnGridRenderedHelper()
        this._columnStartIndex = overscanColumnIndices.overscanStartIndex;
        this._columnStopIndex = overscanColumnIndices.overscanStopIndex;
        this._rowStartIndex = overscanRowIndices.overscanStartIndex;
        this._rowStopIndex = overscanRowIndices.overscanStopIndex;

        for (var rowIndex = this._rowStartIndex; rowIndex <= this._rowStopIndex; rowIndex++) {
          var rowDatum = this._rowMetadata[rowIndex];

          for (var columnIndex = this._columnStartIndex; columnIndex <= this._columnStopIndex; columnIndex++) {
            var columnDatum = this._columnMetadata[columnIndex];
            var renderedCell = renderCell({ columnIndex: columnIndex, rowIndex: rowIndex });
            var key = rowIndex + '-' + columnIndex;

            // any other falsey value will be rendered
            // as a text node by React
            if (renderedCell == null || renderedCell === false) {
              continue;
            }

            var child = _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'Grid__cell',
                style: {
                  height: rowDatum.size,
                  left: columnDatum.offset,
                  top: rowDatum.offset,
                  width: columnDatum.size
                }
              },
              renderedCell
            );

            childrenToDisplay.push(child);
          }
        }
      }

      var gridStyle = {
        height: height,
        width: width
      };

      var totalColumnsWidth = this._getTotalColumnsWidth();
      var totalRowsHeight = this._getTotalRowsHeight();

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      if (totalColumnsWidth <= width) {
        gridStyle.overflowX = 'hidden';
      }

      if (totalRowsHeight <= height) {
        gridStyle.overflowY = 'hidden';
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'scrollingContainer',
          className: (0, _classnames2.default)('Grid', className),
          onScroll: this._onScroll,
          tabIndex: 0,
          style: gridStyle
        },
        childrenToDisplay.length > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Grid__innerScrollContainer',
            style: {
              width: totalColumnsWidth,
              height: totalRowsHeight,
              maxWidth: totalColumnsWidth,
              maxHeight: totalRowsHeight,
              pointerEvents: isScrolling ? 'none' : 'auto'
            }
          },
          childrenToDisplay
        ),
        childrenToDisplay.length === 0 && noContentRenderer()
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* ---------------------------- Helper methods ---------------------------- */

  }, {
    key: '_computeColumnMetadata',
    value: function _computeColumnMetadata(props) {
      var columnsCount = props.columnsCount;
      var columnWidth = props.columnWidth;


      this._columnMetadata = (0, _GridUtils.initCellMetadata)({
        cellsCount: columnsCount,
        size: columnWidth
      });
    }
  }, {
    key: '_computeRowMetadata',
    value: function _computeRowMetadata(props) {
      var rowHeight = props.rowHeight;
      var rowsCount = props.rowsCount;


      this._rowMetadata = (0, _GridUtils.initCellMetadata)({
        cellsCount: rowsCount,
        size: rowHeight
      });
    }

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Grid.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      var _this2 = this;

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(function () {
        _this2._disablePointerEventsTimeoutId = null;
        _this2.setState({
          isScrolling: false
        });
      }, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_getTotalColumnsWidth',
    value: function _getTotalColumnsWidth() {
      if (this._columnMetadata.length === 0) {
        return 0;
      }

      var datum = this._columnMetadata[this._columnMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_getTotalRowsHeight',
    value: function _getTotalRowsHeight() {
      if (this._rowMetadata.length === 0) {
        return 0;
      }

      var datum = this._rowMetadata[this._rowMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_invokeOnGridRenderedHelper',
    value: function _invokeOnGridRenderedHelper() {
      var onSectionRendered = this.props.onSectionRendered;


      this._onGridRenderedMemoizer({
        callback: onSectionRendered,
        indices: {
          columnOverscanStartIndex: this._columnStartIndex,
          columnOverscanStopIndex: this._columnStopIndex,
          columnStartIndex: this._renderedColumnStartIndex,
          columnStopIndex: this._renderedColumnStopIndex,
          rowOverscanStartIndex: this._rowStartIndex,
          rowOverscanStopIndex: this._rowStopIndex,
          rowStartIndex: this._renderedRowStartIndex,
          rowStopIndex: this._renderedRowStopIndex
        }
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref) {
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var totalColumnsWidth = _ref.totalColumnsWidth;
      var totalRowsHeight = _ref.totalRowsHeight;
      var _props4 = this.props;
      var height = _props4.height;
      var onScroll = _props4.onScroll;
      var width = _props4.width;


      this._onScrollMemoizer({
        callback: function callback(_ref2) {
          var scrollLeft = _ref2.scrollLeft;
          var scrollTop = _ref2.scrollTop;

          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalRowsHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalColumnsWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this3 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this3._setNextStateAnimationFrameId = null;
        _this3.setState(state);
      });
    }
  }, {
    key: '_setScrollPosition',
    value: function _setScrollPosition(_ref3) {
      var scrollLeft = _ref3.scrollLeft;
      var scrollTop = _ref3.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (scrollLeft >= 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop >= 0) {
        newState.scrollTop = scrollTop;
      }

      if (scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_updateScrollLeftForScrollToColumn',
    value: function _updateScrollLeftForScrollToColumn(scrollToColumnOverride) {
      var scrollToColumn = scrollToColumnOverride != null ? scrollToColumnOverride : this.props.scrollToColumn;

      var width = this.props.width;
      var scrollLeft = this.state.scrollLeft;


      if (scrollToColumn >= 0) {
        var calculatedScrollLeft = (0, _GridUtils.getUpdatedOffsetForIndex)({
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: scrollToColumn
        });

        if (scrollLeft !== calculatedScrollLeft) {
          this._setScrollPosition({
            scrollLeft: calculatedScrollLeft
          });
        }
      }
    }
  }, {
    key: '_updateScrollTopForScrollToRow',
    value: function _updateScrollTopForScrollToRow(scrollToRowOverride) {
      var scrollToRow = scrollToRowOverride != null ? scrollToRowOverride : this.props.scrollToRow;

      var height = this.props.height;
      var scrollTop = this.state.scrollTop;


      if (scrollToRow >= 0) {
        var calculatedScrollTop = (0, _GridUtils.getUpdatedOffsetForIndex)({
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: scrollToRow
        });

        if (scrollTop !== calculatedScrollTop) {
          this._setScrollPosition({
            scrollTop: calculatedScrollTop
          });
        }
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target !== this.refs.scrollingContainer) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._enablePointerEventsAfterDelay();

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scrollTop never exceeds the total height.
      var _props5 = this.props;
      var height = _props5.height;
      var width = _props5.width;

      var scrollbarSize = this._scrollbarSize;
      var totalRowsHeight = this._getTotalRowsHeight();
      var totalColumnsWidth = this._getTotalColumnsWidth();
      var scrollLeft = Math.min(totalColumnsWidth - width + scrollbarSize, event.target.scrollLeft);
      var scrollTop = Math.min(totalRowsHeight - height + scrollbarSize, event.target.scrollTop);

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Browsers with cancelable scroll events (eg. Firefox) interrupt scrolling animations if scrollTop/scrollLeft is set.
        // Other browsers (eg. Safari) don't scroll as well without the help under certain conditions (DOM or style changes during scrolling).
        // All things considered, this seems to be the best current work around that I'm aware of.
        // For more information see https://github.com/bvaughn/react-virtualized/pull/124
        var scrollPositionChangeReason = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS.OBSERVED : SCROLL_POSITION_CHANGE_REASONS.REQUESTED;

        if (!this.state.isScrolling) {
          this.setState({
            isScrolling: true
          });
        }

        this._setNextState({
          isScrolling: true,
          scrollLeft: scrollLeft,
          scrollPositionChangeReason: scrollPositionChangeReason,
          scrollTop: scrollTop
        });
      }

      this._invokeOnScrollMemoizer({ scrollLeft: scrollLeft, scrollTop: scrollTop, totalColumnsWidth: totalColumnsWidth, totalRowsHeight: totalRowsHeight });
    }
  }]);

  return Grid;
}(_react.Component);

Grid.propTypes = {
  /**
   * Optional custom CSS class name to attach to root Grid element.
   */
  className: _react.PropTypes.string,

  /**
   * Number of columns in grid.
   */
  columnsCount: _react.PropTypes.number.isRequired,

  /**
   * Either a fixed column width (number) or a function that returns the width of a column given its index.
   * Should implement the following interface: (index: number): number
   */
  columnWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Height of Grid; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Optional renderer to be used in place of rows when either :rowsCount or :columnsCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Grid that was just rendered.
   * ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }): void
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of columns to render before/after the visible section of the grid.
   * These columns can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanColumnsCount: _react.PropTypes.number.isRequired,

  /**
   * Number of rows to render above/below the visible section of the grid.
   * These rows can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: ({ columnIndex: number, rowIndex: number }): PropTypes.node
   */
  renderCell: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * Should implement the following interface: (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Number of rows in grid.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Horizontal offset. */
  scrollLeft: _react.PropTypes.number,

  /**
   * Column index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToColumn: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Row index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToRow: _react.PropTypes.number,

  /**
   * Width of Grid; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
Grid.defaultProps = {
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  },
  overscanColumnsCount: 0,
  overscanRowsCount: 10
};
exports.default = Grid;
},{"./GridUtils":44,"classnames":undefined,"dom-helpers/util/scrollbarSize":16,"raf":26,"react":undefined,"react-addons-shallow-compare":27}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeCellMetadataAndUpdateScrollOffsetHelper = computeCellMetadataAndUpdateScrollOffsetHelper;
exports.createCallbackMemoizer = createCallbackMemoizer;
exports.findNearestCell = findNearestCell;
exports.getOverscanIndices = getOverscanIndices;
exports.getUpdatedOffsetForIndex = getUpdatedOffsetForIndex;
exports.getVisibleCellIndices = getVisibleCellIndices;
exports.initCellMetadata = initCellMetadata;
exports.updateScrollIndexHelper = updateScrollIndexHelper;
/**
 * Helper method that determines when to recalculate row or column metadata.
 *
 * @param cellsCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param computeMetadataCallback Method to invoke if cell metadata should be recalculated
 * @param computeMetadataCallbackProps Parameters to pass to :computeMetadataCallback
 * @param computeMetadataOnNextUpdate Flag specifying that metadata should be recalculated
 * @param nextCellsCount Newly updated number of rows or columns in the current axis
 * @param nextCellsSize Newly updated width or height of cells for the current axis
 * @param nextScrollToIndex Newly updated scroll-to-index
 * @param scrollToIndex Scroll-to-index
 * @param updateScrollOffsetForScrollToIndex Callback to invoke if the scroll position should be recalculated
 */
function computeCellMetadataAndUpdateScrollOffsetHelper(_ref) {
  var cellsCount = _ref.cellsCount;
  var cellSize = _ref.cellSize;
  var computeMetadataCallback = _ref.computeMetadataCallback;
  var computeMetadataCallbackProps = _ref.computeMetadataCallbackProps;
  var computeMetadataOnNextUpdate = _ref.computeMetadataOnNextUpdate;
  var nextCellsCount = _ref.nextCellsCount;
  var nextCellSize = _ref.nextCellSize;
  var nextScrollToIndex = _ref.nextScrollToIndex;
  var scrollToIndex = _ref.scrollToIndex;
  var updateScrollOffsetForScrollToIndex = _ref.updateScrollOffsetForScrollToIndex;

  // Don't compare cell sizes if they are functions because inline functions would cause infinite loops.
  // In that event users should use the manual recompute methods to inform of changes.
  if (computeMetadataOnNextUpdate || cellsCount !== nextCellsCount || (typeof cellSize === 'number' || typeof nextCellSize === 'number') && cellSize !== nextCellSize) {
    computeMetadataCallback(computeMetadataCallbackProps);

    // Updated cell metadata may have hidden the previous scrolled-to item.
    // In this case we should also update the scrollTop to ensure it stays visible.
    if (scrollToIndex >= 0 && scrollToIndex === nextScrollToIndex) {
      updateScrollOffsetForScrollToIndex();
    }
  }
}

/**
 * Helper utility that updates the specified callback whenever any of the specified indices have changed.
 */
function createCallbackMemoizer() {
  var requireAllKeys = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  var cachedIndices = {};

  return function (_ref2) {
    var callback = _ref2.callback;
    var indices = _ref2.indices;

    var keys = Object.keys(indices);
    var allInitialized = !requireAllKeys || keys.every(function (key) {
      return indices[key] >= 0;
    });
    var indexChanged = keys.some(function (key) {
      return cachedIndices[key] !== indices[key];
    });

    cachedIndices = indices;

    if (allInitialized && indexChanged) {
      callback(indices);
    }
  };
}

/**
 * Binary search function inspired by react-infinite.
 */
function findNearestCell(_ref3) {
  var cellMetadata = _ref3.cellMetadata;
  var mode = _ref3.mode;
  var offset = _ref3.offset;

  var high = cellMetadata.length - 1;
  var low = 0;
  var middle = undefined;
  var currentOffset = undefined;

  // TODO Add better guards here against NaN offset

  while (low <= high) {
    middle = low + Math.floor((high - low) / 2);
    currentOffset = cellMetadata[middle].offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (mode === findNearestCell.EQUAL_OR_LOWER && low > 0) {
    return low - 1;
  } else if (mode === findNearestCell.EQUAL_OR_HIGHER && high < cellMetadata.length - 1) {
    return high + 1;
  }
}

findNearestCell.EQUAL_OR_LOWER = 1;
findNearestCell.EQUAL_OR_HIGHER = 2;

function getOverscanIndices(_ref4) {
  var cellsCount = _ref4.cellsCount;
  var overscanCellsCount = _ref4.overscanCellsCount;
  var startIndex = _ref4.startIndex;
  var stopIndex = _ref4.stopIndex;

  return {
    overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
    overscanStopIndex: Math.min(cellsCount - 1, stopIndex + overscanCellsCount)
  };
}

/**
 * Determines a new offset that ensures a certain cell is visible, given the current offset.
 * If the cell is already visible then the current offset will be returned.
 * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @param targetIndex Index of target cell
 * @return Offset to use to ensure the specified cell is visible
 */
function getUpdatedOffsetForIndex(_ref5) {
  var cellMetadata = _ref5.cellMetadata;
  var containerSize = _ref5.containerSize;
  var currentOffset = _ref5.currentOffset;
  var targetIndex = _ref5.targetIndex;

  if (cellMetadata.length === 0) {
    return 0;
  }

  targetIndex = Math.max(0, Math.min(cellMetadata.length - 1, targetIndex));

  var datum = cellMetadata[targetIndex];
  var maxOffset = datum.offset;
  var minOffset = maxOffset - containerSize + datum.size;
  var newOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));

  return newOffset;
}

/**
 * Determines the range of cells to display for a given offset in order to fill the specified container.
 *
 * @param cellsCount Total number of cells.
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return An object containing :start and :stop attributes, each specifying a cell index
 */
function getVisibleCellIndices(_ref6) {
  var cellsCount = _ref6.cellsCount;
  var cellMetadata = _ref6.cellMetadata;
  var containerSize = _ref6.containerSize;
  var currentOffset = _ref6.currentOffset;

  if (cellsCount === 0) {
    return {};
  }

  // TODO Add better guards here against NaN offset

  var lastDatum = cellMetadata[cellMetadata.length - 1];
  var totalCellSize = lastDatum.offset + lastDatum.size;

  // Ensure offset is within reasonable bounds
  currentOffset = Math.max(0, Math.min(totalCellSize - containerSize, currentOffset));

  var maxOffset = Math.min(totalCellSize, currentOffset + containerSize);

  var start = findNearestCell({
    cellMetadata: cellMetadata,
    mode: findNearestCell.EQUAL_OR_LOWER,
    offset: currentOffset
  });

  var datum = cellMetadata[start];
  currentOffset = datum.offset + datum.size;

  var stop = start;

  while (currentOffset < maxOffset && stop < cellsCount - 1) {
    stop++;

    currentOffset += cellMetadata[stop].size;
  }

  return {
    start: start,
    stop: stop
  };
}

/**
 * Initializes metadata for an axis and its cells.
 * This data is used to determine which cells are visible given a container size and scroll position.
 *
 * @param cellsCount Total number of cells.
 * @param size Either a fixed size or a function that returns the size for a given given an index.
 * @return Object mapping cell index to cell metadata (size, offset)
 */
function initCellMetadata(_ref7) {
  var cellsCount = _ref7.cellsCount;
  var size = _ref7.size;

  var sizeGetter = size instanceof Function ? size : function (index) {
    return size;
  };

  var cellMetadata = [];
  var offset = 0;

  for (var i = 0; i < cellsCount; i++) {
    var _size = sizeGetter(i);

    if (_size == null || isNaN(_size)) {
      throw Error('Invalid size returned for cell ' + i + ' of value ' + _size);
    }

    cellMetadata[i] = {
      size: _size,
      offset: offset
    };

    offset += _size;
  }

  return cellMetadata;
}

/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param cellsCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param previousCellsCount Previous number of rows or columns
 * @param previousCellsSize Previous width or height of cells
 * @param previousScrollToIndex Previous scroll-to-index
 * @param previousSize Previous width or height of the virtualized container
 * @param scrollOffset Current scrollLeft or scrollTop
 * @param scrollToIndex Scroll-to-index
 * @param size Width or height of the virtualized container
 * @param updateScrollIndexCallback Callback to invoke with an optional scroll-to-index override
 */
function updateScrollIndexHelper(_ref8) {
  var cellMetadata = _ref8.cellMetadata;
  var cellsCount = _ref8.cellsCount;
  var cellSize = _ref8.cellSize;
  var previousCellsCount = _ref8.previousCellsCount;
  var previousCellSize = _ref8.previousCellSize;
  var previousScrollToIndex = _ref8.previousScrollToIndex;
  var previousSize = _ref8.previousSize;
  var scrollOffset = _ref8.scrollOffset;
  var scrollToIndex = _ref8.scrollToIndex;
  var size = _ref8.size;
  var updateScrollIndexCallback = _ref8.updateScrollIndexCallback;

  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellsCount;
  var sizeHasChanged = size !== previousSize || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback();

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && (size < previousSize || cellsCount < previousCellsCount)) {
      var calculatedScrollOffset = getUpdatedOffsetForIndex({
        cellMetadata: cellMetadata,
        containerSize: size,
        currentOffset: scrollOffset,
        targetIndex: cellsCount - 1
      });

      // Only adjust the scroll position if we've scrolled below the last set of rows.
      if (calculatedScrollOffset < scrollOffset) {
        updateScrollIndexCallback(cellsCount - 1);
      }
    }
}
},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = exports.default = undefined;

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Grid3.default;
exports.Grid = _Grid3.default;
},{"./Grid":43}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isRangeVisible = isRangeVisible;
exports.scanForUnloadedRanges = scanForUnloadedRanges;

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Higher-order component that manages lazy-loading for "infinite" data.
 * This component decorates a virtual component and just-in-time prefetches rows as a user scrolls.
 * It is intended as a convenience component; fork it if you'd like finer-grained control over data-loading.
 */

var InfiniteLoader = function (_Component) {
  _inherits(InfiniteLoader, _Component);

  function InfiniteLoader(props, context) {
    _classCallCheck(this, InfiniteLoader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteLoader).call(this, props, context));

    _this._onRowsRendered = _this._onRowsRendered.bind(_this);
    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(InfiniteLoader, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return children({
        onRowsRendered: this._onRowsRendered,
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onRowsRendered',
    value: function _onRowsRendered(_ref) {
      var _this2 = this;

      var startIndex = _ref.startIndex;
      var stopIndex = _ref.stopIndex;
      var _props = this.props;
      var isRowLoaded = _props.isRowLoaded;
      var loadMoreRows = _props.loadMoreRows;
      var rowsCount = _props.rowsCount;
      var threshold = _props.threshold;


      this._lastRenderedStartIndex = startIndex;
      this._lastRenderedStopIndex = stopIndex;

      var unloadedRanges = scanForUnloadedRanges({
        isRowLoaded: isRowLoaded,
        startIndex: Math.max(0, startIndex - threshold),
        stopIndex: Math.min(rowsCount, stopIndex + threshold)
      });

      unloadedRanges.forEach(function (unloadedRange) {
        var promise = loadMoreRows(unloadedRange);
        if (promise) {
          promise.then(function () {
            // Refresh the visible rows if any of them have just been loaded.
            // Otherwise they will remain in their unloaded visual state.
            if (isRangeVisible({
              lastRenderedStartIndex: _this2._lastRenderedStartIndex,
              lastRenderedStopIndex: _this2._lastRenderedStopIndex,
              startIndex: unloadedRange.startIndex,
              stopIndex: unloadedRange.stopIndex
            })) {
              if (_this2._registeredChild) {
                _this2._registeredChild.forceUpdate();
              }
            }
          });
        }
      });
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(registeredChild) {
      this._registeredChild = registeredChild;
    }
  }]);

  return InfiniteLoader;
}(_react.Component);

/**
 * Determines if the specified start/stop range is visible based on the most recently rendered range.
 */


InfiniteLoader.propTypes = {
  /**
   * Function respondible for rendering a virtualized component.
   * This function should implement the following signature:
   * ({ onRowsRendered, registerChild }) => PropTypes.element
   *
   * The specified :onRowsRendered function should be passed through to the child's :onRowsRendered property.
   * The :registerChild callback should be set as the virtualized component's :ref.
   */
  children: _react.PropTypes.func.isRequired,

  /**
   * Function responsible for tracking the loaded state of each row.
   * It should implement the following signature: (index: number): boolean
   */
  isRowLoaded: _react.PropTypes.func.isRequired,

  /**
   * Callback to be invoked when more rows must be loaded.
   * It should implement the following signature: ({ startIndex, stopIndex }): Promise
   * The returned Promise should be resolved once row data has finished loading.
   * It will be used to determine when to refresh the list with the newly-loaded data.
   * This callback may be called multiple times in reaction to a single scroll event.
   */
  loadMoreRows: _react.PropTypes.func.isRequired,

  /**
   * Number of rows in list; can be arbitrary high number if actual number is unknown.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /**
   * Threshold at which to pre-fetch data.
   * A threshold X means that data will start loading when a user scrolls within X rows.
   * This value defaults to 15.
   */
  threshold: _react.PropTypes.number.isRequired
};
InfiniteLoader.defaultProps = {
  rowsCount: 0,
  threshold: 15
};
exports.default = InfiniteLoader;
function isRangeVisible(_ref2) {
  var lastRenderedStartIndex = _ref2.lastRenderedStartIndex;
  var lastRenderedStopIndex = _ref2.lastRenderedStopIndex;
  var startIndex = _ref2.startIndex;
  var stopIndex = _ref2.stopIndex;

  return !(startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex);
}

/**
 * Returns all of the ranges within a larger range that contain unloaded rows.
 */
function scanForUnloadedRanges(_ref3) {
  var isRowLoaded = _ref3.isRowLoaded;
  var startIndex = _ref3.startIndex;
  var stopIndex = _ref3.stopIndex;

  var unloadedRanges = [];
  var rangeStartIndex = null;
  var rangeStopIndex = null;

  for (var i = startIndex; i <= stopIndex; i++) {
    var loaded = isRowLoaded(i);

    if (!loaded) {
      rangeStopIndex = i;
      if (rangeStartIndex === null) {
        rangeStartIndex = i;
      }
    } else if (rangeStopIndex !== null) {
      unloadedRanges.push({
        startIndex: rangeStartIndex,
        stopIndex: rangeStopIndex
      });

      rangeStartIndex = rangeStopIndex = null;
    }
  }

  if (rangeStopIndex !== null) {
    unloadedRanges.push({
      startIndex: rangeStartIndex,
      stopIndex: rangeStopIndex
    });
  }

  return unloadedRanges;
}
},{"react":undefined,"react-addons-shallow-compare":27}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteLoader = exports.default = undefined;

var _InfiniteLoader2 = require('./InfiniteLoader');

var _InfiniteLoader3 = _interopRequireDefault(_InfiniteLoader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _InfiniteLoader3.default;
exports.InfiniteLoader = _InfiniteLoader3.default;
},{"./InfiniteLoader":46}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */

var ScrollSync = function (_Component) {
  _inherits(ScrollSync, _Component);

  function ScrollSync(props, context) {
    _classCallCheck(this, ScrollSync);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollSync).call(this, props, context));

    _this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    };

    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollSync, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var clientHeight = _state.clientHeight;
      var clientWidth = _state.clientWidth;
      var scrollHeight = _state.scrollHeight;
      var scrollLeft = _state.scrollLeft;
      var scrollTop = _state.scrollTop;
      var scrollWidth = _state.scrollWidth;


      return children({
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        onScroll: this._onScroll,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref) {
      var clientHeight = _ref.clientHeight;
      var clientWidth = _ref.clientWidth;
      var scrollHeight = _ref.scrollHeight;
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var scrollWidth = _ref.scrollWidth;

      this.setState({ clientHeight: clientHeight, clientWidth: clientWidth, scrollHeight: scrollHeight, scrollLeft: scrollLeft, scrollTop: scrollTop, scrollWidth: scrollWidth });
    }
  }]);

  return ScrollSync;
}(_react.Component);

ScrollSync.propTypes = {
  /**
   * Function respondible for rendering 2 or more virtualized components.
   * This function should implement the following signature:
   * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired
};
exports.default = ScrollSync;
},{"react":undefined,"react-addons-shallow-compare":27}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollSync = exports.default = undefined;

var _ScrollSync2 = require('./ScrollSync');

var _ScrollSync3 = _interopRequireDefault(_ScrollSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ScrollSync3.default;
exports.ScrollSync = _ScrollSync3.default;
},{"./ScrollSync":48}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll() {
    _classCallCheck(this, VirtualScroll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualScroll).apply(this, arguments));
  }

  _createClass(VirtualScroll, [{
    key: 'recomputeRowHeights',


    /**
     * See Grid#recomputeGridSize
     */
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var rowHeight = _props.rowHeight;
      var rowRenderer = _props.rowRenderer;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;


      var classNames = (0, _classnames2.default)('VirtualScroll', className);

      return _react2.default.createElement(_Grid2.default, {
        ref: 'Grid',
        className: classNames,
        columnWidth: width,
        columnsCount: 1,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: function onScroll(_ref) {
          var clientHeight = _ref.clientHeight;
          var scrollHeight = _ref.scrollHeight;
          var scrollTop = _ref.scrollTop;
          return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
        },
        onSectionRendered: function onSectionRendered(_ref2) {
          var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
          var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
          var rowStartIndex = _ref2.rowStartIndex;
          var rowStopIndex = _ref2.rowStopIndex;
          return onRowsRendered({
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
          });
        },
        overscanRowsCount: overscanRowsCount,
        renderCell: function renderCell(_ref3) {
          var columnIndex = _ref3.columnIndex;
          var rowIndex = _ref3.rowIndex;
          return rowRenderer(rowIndex);
        },
        rowHeight: rowHeight,
        rowsCount: rowsCount,
        scrollToRow: scrollToIndex,
        scrollTop: scrollTop,
        width: width
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }]);

  return VirtualScroll;
}(_react.Component);

VirtualScroll.propTypes = {
  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index */
  rowRenderer: _react.PropTypes.func.isRequired,

  /** Number of rows in list. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = VirtualScroll;
},{"../Grid":45,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":27}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualScroll = exports.default = undefined;

var _VirtualScroll2 = require('./VirtualScroll');

var _VirtualScroll3 = _interopRequireDefault(_VirtualScroll2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualScroll3.default;
exports.VirtualScroll = _VirtualScroll3.default;
},{"./VirtualScroll":50}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ArrowKeyStepper = require('./ArrowKeyStepper');

Object.defineProperty(exports, 'ArrowKeyStepper', {
  enumerable: true,
  get: function get() {
    return _ArrowKeyStepper.ArrowKeyStepper;
  }
});

var _AutoSizer = require('./AutoSizer');

Object.defineProperty(exports, 'AutoSizer', {
  enumerable: true,
  get: function get() {
    return _AutoSizer.AutoSizer;
  }
});

var _ColumnSizer = require('./ColumnSizer');

Object.defineProperty(exports, 'ColumnSizer', {
  enumerable: true,
  get: function get() {
    return _ColumnSizer.ColumnSizer;
  }
});

var _FlexTable = require('./FlexTable');

Object.defineProperty(exports, 'FlexTable', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexTable;
  }
});
Object.defineProperty(exports, 'FlexColumn', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexColumn;
  }
});
Object.defineProperty(exports, 'SortDirection', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortDirection;
  }
});
Object.defineProperty(exports, 'SortIndicator', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortIndicator;
  }
});

var _Grid = require('./Grid');

Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _Grid.Grid;
  }
});

var _InfiniteLoader = require('./InfiniteLoader');

Object.defineProperty(exports, 'InfiniteLoader', {
  enumerable: true,
  get: function get() {
    return _InfiniteLoader.InfiniteLoader;
  }
});

var _ScrollSync = require('./ScrollSync');

Object.defineProperty(exports, 'ScrollSync', {
  enumerable: true,
  get: function get() {
    return _ScrollSync.ScrollSync;
  }
});

var _VirtualScroll = require('./VirtualScroll');

Object.defineProperty(exports, 'VirtualScroll', {
  enumerable: true,
  get: function get() {
    return _VirtualScroll.VirtualScroll;
  }
});
},{"./ArrowKeyStepper":33,"./AutoSizer":35,"./ColumnSizer":37,"./FlexTable":42,"./Grid":45,"./InfiniteLoader":47,"./ScrollSync":49,"./VirtualScroll":51}],53:[function(require,module,exports){
'use strict';

/**
* Detect Element Resize.
* Forked in order to guard against unsafe 'window' and 'document' references.
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

// Check `document` and `window` in case of server-side rendering
var _window;
if (typeof window !== 'undefined') {
  _window = window;
} else if (typeof self !== 'undefined') {
  _window = self;
} else {
  _window = undefined;
}

var attachEvent = typeof document !== 'undefined' && document.attachEvent;
var stylesCreated = false;

if (!attachEvent) {
  var requestFrame = function () {
    var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
      return _window.setTimeout(fn, 20);
    };
    return function (fn) {
      return raf(fn);
    };
  }();

  var cancelFrame = function () {
    var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
    return function (id) {
      return cancel(id);
    };
  }();

  var resetTriggers = function resetTriggers(element) {
    var triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  };

  var checkTriggers = function checkTriggers(element) {
    return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
  };

  var scrollListener = function scrollListener(e) {
    var element = this;
    resetTriggers(this);
    if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
    this.__resizeRAF__ = requestFrame(function () {
      if (checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function (fn) {
          fn.call(element, e);
        });
      }
    });
  };

  /* Detect CSS Animations support to detect element display/re-attach */
  var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
      pfx = '';
  {
    var elm = document.createElement('fakeelement');
    if (elm.style.animationName !== undefined) {
      animation = true;
    }

    if (animation === false) {
      for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animationstartevent = startEvents[i];
          animation = true;
          break;
        }
      }
    }
  }

  var animationName = 'resizeanim';
  var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
  var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
}

var createStyles = function createStyles() {
  if (!stylesCreated) {
    //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

var addResizeListener = function addResizeListener(element, fn) {
  if (attachEvent) element.attachEvent('onresize', fn);else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];
      (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
      element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
      element.appendChild(element.__resizeTriggers__);
      resetTriggers(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
        if (e.animationName == animationName) resetTriggers(element);
      });
    }
    element.__resizeListeners__.push(fn);
  }
};

var removeResizeListener = function removeResizeListener(element, fn) {
  if (attachEvent) element.detachEvent('onresize', fn);else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
    }
  }
};

module.exports = {
  addResizeListener: addResizeListener,
  removeResizeListener: removeResizeListener
};
},{}],54:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule shallowCompare
*/

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":17}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJpYW52YXVnaG4vRG9jdW1lbnRzL2dpdC9yZWFjdC1zZWxlY3QtYnZhdWdobi9leGFtcGxlcy9zcmMvYXBwLmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ2l0aWVzLmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ29udHJpYnV0b3JzLmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0N1c3RvbVJlbmRlci5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL011bHRpc2VsZWN0LmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdC5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL1N0YXRlcy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL2NpdGllcy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL2NvbnRyaWJ1dG9ycy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL3N0YXRlcy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL3VzZXJzLmpzIiwibm9kZV9tb2R1bGVzL2NoYXJlbmMvY2hhcmVuYy5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdC9jcnlwdC5qcyIsIm5vZGVfbW9kdWxlcy9kb20taGVscGVycy91dGlsL2luRE9NLmpzIiwibm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL3V0aWwvc2Nyb2xsYmFyU2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9zaGFsbG93RXF1YWwuanMiLCJub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzLXJldGluYS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tZDUvbWQ1LmpzIiwibm9kZV9tb2R1bGVzL3BlcmZvcm1hbmNlLW5vdy9saWIvcGVyZm9ybWFuY2Utbm93LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwibm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanMiLCJub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0L2Rpc3QvY29tbW9uanMvVmlydHVhbGl6ZWRTZWxlY3QvVmlydHVhbGl6ZWRTZWxlY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0L2Rpc3QvY29tbW9uanMvVmlydHVhbGl6ZWRTZWxlY3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BcnJvd0tleVN0ZXBwZXIvQXJyb3dLZXlTdGVwcGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXJyb3dLZXlTdGVwcGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXV0b1NpemVyL0F1dG9TaXplci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0F1dG9TaXplci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbHVtblNpemVyL0NvbHVtblNpemVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sdW1uU2l6ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvRmxleENvbHVtbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9GbGV4VGFibGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvU29ydERpcmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9Tb3J0SW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9HcmlkLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9HcmlkVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvSW5maW5pdGVMb2FkZXIvSW5maW5pdGVMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9JbmZpbml0ZUxvYWRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvU2Nyb2xsU3luYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL1ZpcnR1YWxTY3JvbGwuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy92ZW5kb3IvZGV0ZWN0RWxlbWVudFJlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvc2hhbGxvd0NvbXBhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDYixj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RSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFF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QUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFB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LEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMs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LEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFDakQsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUN4QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUNqQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUNwQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUNyQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLEVBQzlDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZ0NBQWdDLEVBQUUsRUFDeEQsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFDOUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDL0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFDOUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDL0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUMxQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUN2QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUNuQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUNyQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUNqQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUNoQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUN2QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4RUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzd4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGVzbGludCByZWFjdC9wcm9wLXR5cGVzOiAwICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IENvbnRyaWJ1dG9ycyBmcm9tICcuL2NvbXBvbmVudHMvQ29udHJpYnV0b3JzJztcbmltcG9ydCBDdXN0b21Db21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21Db21wb25lbnRzJztcbmltcG9ydCBDdXN0b21SZW5kZXIgZnJvbSAnLi9jb21wb25lbnRzL0N1c3RvbVJlbmRlcic7XG5pbXBvcnQgTXVsdGlzZWxlY3QgZnJvbSAnLi9jb21wb25lbnRzL011bHRpc2VsZWN0JztcbmltcG9ydCBOdW1lcmljU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9OdW1lcmljU2VsZWN0JztcbmltcG9ydCBDaXRpZXMgZnJvbSAnLi9jb21wb25lbnRzL0NpdGllcyc7XG5pbXBvcnQgU3RhdGVzIGZyb20gJy4vY29tcG9uZW50cy9TdGF0ZXMnO1xuXG5SZWFjdERPTS5yZW5kZXIoXG5cdDxkaXY+XG5cdFx0PENpdGllcyBsYWJlbD1cIkNpdGllc1wiIC8+XG5cdFx0PFN0YXRlcyBsYWJlbD1cIlN0YXRlc1wiIHNlYXJjaGFibGUgLz5cblx0XHQ8TXVsdGlzZWxlY3QgbGFiZWw9XCJNdWx0aXNlbGVjdFwiIC8+XG5cdFx0PENvbnRyaWJ1dG9ycyBsYWJlbD1cIkNvbnRyaWJ1dG9ycyAoQXN5bmMpXCIgLz5cblx0XHQ8TnVtZXJpY1NlbGVjdCBsYWJlbD1cIk51bWVyaWMgVmFsdWVzXCIgLz5cblx0XHQ8Q3VzdG9tUmVuZGVyIGxhYmVsPVwiQ3VzdG9tIFJlbmRlciBNZXRob2RzXCIvPlxuXHRcdDxDdXN0b21Db21wb25lbnRzIGxhYmVsPVwiQ3VzdG9tIFBsYWNlaG9sZGVyLCBPcHRpb24gYW5kIFZhbHVlIENvbXBvbmVudHNcIiAvPlxuXHRcdHsvKlxuXHRcdDxTZWxlY3RlZFZhbHVlc0ZpZWxkIGxhYmVsPVwiT3B0aW9uIENyZWF0aW9uICh0YWdzIG1vZGUpXCIgb3B0aW9ucz17RkxBVk9VUlN9IGFsbG93Q3JlYXRlIGhpbnQ9XCJFbnRlciBhIHZhbHVlIHRoYXQncyBOT1QgaW4gdGhlIGxpc3QsIHRoZW4gaGl0IHJldHVyblwiIC8+XG5cdFx0Ki99XG5cdDwvZGl2Pixcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVmlydHVhbGl6ZWRTZWxlY3QgZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0JztcblxuY29uc3QgREFUQSA9IHJlcXVpcmUoJy4uL2RhdGEvY2l0aWVzJyk7XG5cbnZhciBDaXRpZXNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdDaXRpZXNGaWVsZCcsXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHR1cGRhdGVWYWx1ZSAobmV3VmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNlbGVjdFZhbHVlOiBuZXdWYWx1ZVxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBvcHRpb25zID0gREFUQS5DSVRJRVM7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+TGFyZ2UgRGF0YXNldHM8L2gzPlxuXHRcdFx0XHQ8VmlydHVhbGl6ZWRTZWxlY3QgcmVmPVwiY2l0eVNlbGVjdFwiXG5cdFx0XHRcdFx0YXV0b2ZvY3VzXG5cdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxuXHRcdFx0XHRcdGNsZWFyYWJsZVxuXHRcdFx0XHRcdG5hbWU9XCJzZWxlY3QtY2l0eVwiXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9XG5cdFx0XHRcdFx0c2VhcmNoYWJsZVxuXHRcdFx0XHRcdGxhYmVsS2V5PVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWVLZXk9XCJuYW1lXCJcblx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+XG5cdFx0XHRcdFx0VXNlcyA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWRcIj5yZWFjdC12aXJ0dWFsaXplZDwvYT4gYW5kIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC1zZWxlY3QvXCI+cmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0PC9hPiB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgd29ybGQncyAxLDAwMCBsYXJnZXN0IGNpdGllcy5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IENpdGllc0ZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgQ09OVFJJQlVUT1JTID0gcmVxdWlyZSgnLi4vZGF0YS9jb250cmlidXRvcnMnKTtcbmNvbnN0IE1BWF9DT05UUklCVVRPUlMgPSA2O1xuY29uc3QgQVNZTkNfREVMQVkgPSA1MDA7XG5cbmNvbnN0IENvbnRyaWJ1dG9ycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdDb250cmlidXRvcnMnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0XHR2YWx1ZTogW0NPTlRSSUJVVE9SU1swXV0sXG5cdFx0fTtcblx0fSxcblx0b25DaGFuZ2UgKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0fSk7XG5cdH0sXG5cdHN3aXRjaFRvTXVsdGkgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0XHR2YWx1ZTogW3RoaXMuc3RhdGUudmFsdWVdLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb1NpbmdsZSAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtdWx0aTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZVswXSxcblx0XHR9KTtcblx0fSxcblx0Z2V0Q29udHJpYnV0b3JzIChpbnB1dCwgY2FsbGJhY2spIHtcblx0XHRpbnB1dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG5cdFx0dmFyIG9wdGlvbnMgPSBDT05UUklCVVRPUlMuZmlsdGVyKGkgPT4ge1xuXHRcdFx0cmV0dXJuIGkuZ2l0aHViLnN1YnN0cigwLCBpbnB1dC5sZW5ndGgpID09PSBpbnB1dDtcblx0XHR9KTtcblx0XHR2YXIgZGF0YSA9IHtcblx0XHRcdG9wdGlvbnM6IG9wdGlvbnMuc2xpY2UoMCwgTUFYX0NPTlRSSUJVVE9SUyksXG5cdFx0XHRjb21wbGV0ZTogb3B0aW9ucy5sZW5ndGggPD0gTUFYX0NPTlRSSUJVVE9SUyxcblx0XHR9O1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcblx0XHR9LCBBU1lOQ19ERUxBWSk7XG5cdH0sXG5cdGdvdG9Db250cmlidXRvciAodmFsdWUsIGV2ZW50KSB7XG5cdFx0d2luZG93Lm9wZW4oJ2h0dHBzOi8vZ2l0aHViLmNvbS8nICsgdmFsdWUuZ2l0aHViKTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0LkFzeW5jIG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uVmFsdWVDbGljaz17dGhpcy5nb3RvQ29udHJpYnV0b3J9IHZhbHVlS2V5PVwiZ2l0aHViXCIgbGFiZWxLZXk9XCJuYW1lXCIgbG9hZE9wdGlvbnM9e3RoaXMuZ2V0Q29udHJpYnV0b3JzfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMuc3dpdGNoVG9NdWx0aX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NdWx0aXNlbGVjdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXshdGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMuc3dpdGNoVG9TaW5nbGV9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+U2luZ2xlIFZhbHVlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGV4YW1wbGUgaW1wbGVtZW50cyBjdXN0b20gbGFiZWwgYW5kIHZhbHVlIHByb3BlcnRpZXMsIGFzeW5jIG9wdGlvbnMgYW5kIG9wZW5zIHRoZSBnaXRodWIgcHJvZmlsZXMgaW4gYSBuZXcgd2luZG93IHdoZW4gdmFsdWVzIGFyZSBjbGlja2VkPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250cmlidXRvcnM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IEdyYXZhdGFyIGZyb20gJ3JlYWN0LWdyYXZhdGFyJztcblxuY29uc3QgVVNFUlMgPSByZXF1aXJlKCcuLi9kYXRhL3VzZXJzJyk7XG5jb25zdCBHUkFWQVRBUl9TSVpFID0gMTU7XG5cbmNvbnN0IEdyYXZhdGFyT3B0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGlzRGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGlzRm9jdXNlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0aXNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0b25Gb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0b25TZWxlY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG9uVW5mb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0b3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdH0sXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlTW91c2VFbnRlciAoZXZlbnQpIHtcblx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlTW91c2VNb3ZlIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmlzRm9jdXNlZCkgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZUxlYXZlIChldmVudCkge1xuXHRcdHRoaXMucHJvcHMub25VbmZvY3VzKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0bGV0IGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHRvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW91c2VMZWF2ZX1cblx0XHRcdFx0dGl0bGU9e3RoaXMucHJvcHMub3B0aW9uLnRpdGxlfT5cblx0XHRcdFx0PEdyYXZhdGFyIGVtYWlsPXt0aGlzLnByb3BzLm9wdGlvbi5lbWFpbH0gc2l6ZT17R1JBVkFUQVJfU0laRX0gc3R5bGU9e2dyYXZhdGFyU3R5bGV9IC8+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbmNvbnN0IEdyYXZhdGFyVmFsdWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcblx0XHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBncmF2YXRhclN0eWxlID0ge1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG5cdFx0XHRtYXJnaW5SaWdodDogMTAsXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHRcdHRvcDogLTIsXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcblx0XHR9O1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC12YWx1ZVwiIHRpdGxlPXt0aGlzLnByb3BzLnZhbHVlLnRpdGxlfT5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlLWxhYmVsXCI+XG5cdFx0XHRcdFx0PEdyYXZhdGFyIGVtYWlsPXt0aGlzLnByb3BzLnZhbHVlLmVtYWlsfSBzaXplPXtHUkFWQVRBUl9TSVpFfSBzdHlsZT17Z3JhdmF0YXJTdHlsZX0gLz5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbmNvbnN0IFVzZXJzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGhpbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIHBsYWNlaG9sZGVyID0gPHNwYW4+JiM5Nzg2OyBTZWxlY3QgVXNlcjwvc3Bhbj47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2V0VmFsdWV9XG5cdFx0XHRcdFx0b3B0aW9uQ29tcG9uZW50PXtHcmF2YXRhck9wdGlvbn1cblx0XHRcdFx0XHRvcHRpb25zPXtVU0VSU31cblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0dmFsdWVDb21wb25lbnQ9e0dyYXZhdGFyVmFsdWV9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+XG5cdFx0XHRcdFx0VGhpcyBleGFtcGxlIGltcGxlbWVudHMgY3VzdG9tIE9wdGlvbiBhbmQgVmFsdWUgY29tcG9uZW50cyB0byByZW5kZXIgYSBHcmF2YXRhciBpbWFnZSBmb3IgZWFjaCB1c2VyIGJhc2VkIG9uIHRoZWlyIGVtYWlsLlxuXHRcdFx0XHRcdEl0IGFsc28gZGVtb25zdHJhdGVzIHJlbmRlcmluZyBIVE1MIGVsZW1lbnRzIGFzIHRoZSBwbGFjZWhvbGRlci5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBVc2Vyc0ZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxudmFyIERpc2FibGVkVXBzZWxsT3B0aW9ucyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdEaXNhYmxlZFVwc2VsbE9wdGlvbnMnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge307XG5cdH0sXG5cdHNldFZhbHVlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0XHRjb25zb2xlLmxvZygnU3VwcG9ydCBsZXZlbCBzZWxlY3RlZDonLCB2YWx1ZS5sYWJlbCk7XG5cdH0sXG5cdHJlbmRlckxpbms6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiA8YSBzdHlsZT17eyBtYXJnaW5MZWZ0OiA1IH19IGhyZWY9XCIvdXBncmFkZVwiIHRhcmdldD1cIl9ibGFua1wiPlVwZ3JhZGUgaGVyZSE8L2E+O1xuXHR9LFxuXHRyZW5kZXJPcHRpb246IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHJldHVybiA8c3BhbiBzdHlsZT17eyBjb2xvcjogb3B0aW9uLmNvbG9yIH19PntvcHRpb24ubGFiZWx9IHtvcHRpb24ubGlua308L3NwYW4+O1xuXHR9LFxuXHRyZW5kZXJWYWx1ZTogZnVuY3Rpb24ob3B0aW9uKSB7XG5cdFx0cmV0dXJuIDxzdHJvbmcgc3R5bGU9e3sgY29sb3I6IG9wdGlvbi5jb2xvciB9fT57b3B0aW9uLmxhYmVsfTwvc3Ryb25nPjtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgb3B0aW9ucyA9IFtcblx0XHRcdHsgbGFiZWw6ICdCYXNpYyBjdXN0b21lciBzdXBwb3J0JywgdmFsdWU6ICdiYXNpYycsIGNvbG9yOiAnI0UzMTg2NCcgfSxcblx0XHRcdHsgbGFiZWw6ICdQcmVtaXVtIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3ByZW1pdW0nLCBjb2xvcjogJyM2MjE2QTMnIH0sXG5cdFx0XHR7IGxhYmVsOiAnUHJvIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3BybycsIGRpc2FibGVkOiB0cnVlLCBsaW5rOiB0aGlzLnJlbmRlckxpbmsoKSB9LFxuXHRcdF07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiU2VsZWN0IHlvdXIgc3VwcG9ydCBsZXZlbFwiXG5cdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHRvcHRpb25SZW5kZXJlcj17dGhpcy5yZW5kZXJPcHRpb259XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2V0VmFsdWV9XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0dmFsdWVSZW5kZXJlcj17dGhpcy5yZW5kZXJWYWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGRlbW9uc3RhdGVzIGN1c3RvbSByZW5kZXIgbWV0aG9kcyBhbmQgbGlua3MgaW4gZGlzYWJsZWQgb3B0aW9uczwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IERpc2FibGVkVXBzZWxsT3B0aW9ucztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IEZMQVZPVVJTID0gW1xuXHR7IGxhYmVsOiAnQ2hvY29sYXRlJywgdmFsdWU6ICdjaG9jb2xhdGUnIH0sXG5cdHsgbGFiZWw6ICdWYW5pbGxhJywgdmFsdWU6ICd2YW5pbGxhJyB9LFxuXHR7IGxhYmVsOiAnU3RyYXdiZXJyeScsIHZhbHVlOiAnc3RyYXdiZXJyeScgfSxcblx0eyBsYWJlbDogJ0NhcmFtZWwnLCB2YWx1ZTogJ2NhcmFtZWwnIH0sXG5cdHsgbGFiZWw6ICdDb29raWVzIGFuZCBDcmVhbScsIHZhbHVlOiAnY29va2llc2NyZWFtJyB9LFxuXHR7IGxhYmVsOiAnUGVwcGVybWludCcsIHZhbHVlOiAncGVwcGVybWludCcgfSxcbl07XG5cbmNvbnN0IFdIWV9XT1VMRF9ZT1UgPSBbXG5cdHsgbGFiZWw6ICdDaG9jb2xhdGUgKGFyZSB5b3UgY3Jhenk/KScsIHZhbHVlOiAnY2hvY29sYXRlJywgZGlzYWJsZWQ6IHRydWUgfSxcbl0uY29uY2F0KEZMQVZPVVJTLnNsaWNlKDEpKTtcblxudmFyIE11bHRpU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnTXVsdGlTZWxlY3RGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRjcmF6eTogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBGTEFWT1VSUyxcblx0XHRcdHZhbHVlOiBbXSxcblx0XHR9O1xuXHR9LFxuXHRoYW5kbGVTZWxlY3RDaGFuZ2UgKHZhbHVlKSB7XG5cdFx0Y29uc29sZS5sb2coJ1lvdVxcJ3ZlIHNlbGVjdGVkOicsIHZhbHVlKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdH0sXG5cdHRvZ2dsZURpc2FibGVkIChlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRpc2FibGVkOiBlLnRhcmdldC5jaGVja2VkIH0pO1xuXHR9LFxuXHR0b2dnbGVDaG9jb2xhdGUgKGUpIHtcblx0XHRsZXQgY3JhenkgPSBlLnRhcmdldC5jaGVja2VkO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3Jhenk6IGNyYXp5LFxuXHRcdFx0b3B0aW9uczogY3JhenkgPyBXSFlfV09VTERfWU9VIDogRkxBVk9VUlMsXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdCBtdWx0aSBzaW1wbGVWYWx1ZSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHBsYWNlaG9sZGVyPVwiU2VsZWN0IHlvdXIgZmF2b3VyaXRlKHMpXCIgb3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RDaGFuZ2V9IC8+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZURpc2FibGVkfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5EaXNhYmxlIHRoZSBjb250cm9sPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY3Jhenl9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNob2NvbGF0ZX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+SSBkb24ndCBsaWtlIENob2NvbGF0ZSAoZGlzYWJsZWQgdGhlIG9wdGlvbik8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aVNlbGVjdEZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxudmFyIFZhbHVlc0FzTnVtYmVyc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ1ZhbHVlc0FzTnVtYmVyc0ZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHR7IHZhbHVlOiAxMCwgbGFiZWw6ICdUZW4nIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDExLCBsYWJlbDogJ0VsZXZlbicgfSxcblx0XHRcdFx0eyB2YWx1ZTogMTIsIGxhYmVsOiAnVHdlbHZlJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAyMywgbGFiZWw6ICdUd2VudHktdGhyZWUnIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDI0LCBsYWJlbDogJ1R3ZW50eS1mb3VyJyB9XG5cdFx0XHRdLFxuXHRcdFx0bWF0Y2hQb3M6ICdhbnknLFxuXHRcdFx0bWF0Y2hWYWx1ZTogdHJ1ZSxcblx0XHRcdG1hdGNoTGFiZWw6IHRydWUsXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHRcdG11bHRpOiBmYWxzZVxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hTdGFydChldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hQb3M6IGV2ZW50LnRhcmdldC5jaGVja2VkID8gJ3N0YXJ0JyA6ICdhbnknXG5cdFx0fSk7XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hWYWx1ZShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hWYWx1ZTogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblx0b25DaGFuZ2VNYXRjaExhYmVsKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaExhYmVsOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRvbkNoYW5nZSh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0XHRjb25zb2xlLmxvZygnTnVtZXJpYyBTZWxlY3QgdmFsdWUgY2hhbmdlZCB0bycsIHZhbHVlKTtcblx0fSxcblx0b25DaGFuZ2VNdWx0aShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG1hdGNoUHJvcCA9ICdhbnknO1xuXHRcdGlmICh0aGlzLnN0YXRlLm1hdGNoTGFiZWwgJiYgIXRoaXMuc3RhdGUubWF0Y2hWYWx1ZSkge1xuXHRcdFx0bWF0Y2hQcm9wID0gJ2xhYmVsJztcblx0XHR9XG5cdFx0aWYgKCF0aGlzLnN0YXRlLm1hdGNoTGFiZWwgJiYgdGhpcy5zdGF0ZS5tYXRjaFZhbHVlKSB7XG5cdFx0XHRtYXRjaFByb3AgPSAndmFsdWUnO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0bWF0Y2hQb3M9e3RoaXMuc3RhdGUubWF0Y2hQb3N9XG5cdFx0XHRcdFx0bWF0Y2hQcm9wPXttYXRjaFByb3B9XG5cdFx0XHRcdFx0bXVsdGk9e3RoaXMuc3RhdGUubXVsdGl9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfVxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTXVsdGl9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk11bHRpLVNlbGVjdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoVmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hWYWx1ZX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggdmFsdWUgb25seTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoTGFiZWx9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hMYWJlbH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggbGFiZWwgb25seTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoUG9zID09PSAnc3RhcnQnfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoU3RhcnR9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk9ubHkgaW5jbHVkZSBtYXRjaGVzIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmc8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZXhhbXBsZSB1c2VzIHNpbXBsZSBudW1lcmljIHZhbHVlczwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVzQXNOdW1iZXJzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5jb25zdCBTVEFURVMgPSByZXF1aXJlKCcuLi9kYXRhL3N0YXRlcycpO1xuXG52YXIgU3RhdGVzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnU3RhdGVzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzZWFyY2hhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGFiZWw6ICdTdGF0ZXM6Jyxcblx0XHRcdHNlYXJjaGFibGU6IHRydWUsXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y291bnRyeTogJ0FVJyxcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdHNlYXJjaGFibGU6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdHNlbGVjdFZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJyxcblx0XHRcdGNsZWFyYWJsZTogdHJ1ZSxcblx0XHR9O1xuXHR9LFxuXHRzd2l0Y2hDb3VudHJ5IChlKSB7XG5cdFx0dmFyIG5ld0NvdW50cnkgPSBlLnRhcmdldC52YWx1ZTtcblx0XHRjb25zb2xlLmxvZygnQ291bnRyeSBjaGFuZ2VkIHRvICcgKyBuZXdDb3VudHJ5KTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNvdW50cnk6IG5ld0NvdW50cnksXG5cdFx0XHRzZWxlY3RWYWx1ZTogbnVsbFxuXHRcdH0pO1xuXHR9LFxuXHR1cGRhdGVWYWx1ZSAobmV3VmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZygnU3RhdGUgY2hhbmdlZCB0byAnICsgbmV3VmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2VsZWN0VmFsdWU6IG5ld1ZhbHVlXG5cdFx0fSk7XG5cdH0sXG5cdGZvY3VzU3RhdGVTZWxlY3QgKCkge1xuXHRcdHRoaXMucmVmcy5zdGF0ZVNlbGVjdC5mb2N1cygpO1xuXHR9LFxuXHR0b2dnbGVDaGVja2JveCAoZSkge1xuXHRcdGxldCBuZXdTdGF0ZSA9IHt9O1xuXHRcdG5ld1N0YXRlW2UudGFyZ2V0Lm5hbWVdID0gZS50YXJnZXQuY2hlY2tlZDtcblx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgb3B0aW9ucyA9IFNUQVRFU1t0aGlzLnN0YXRlLmNvdW50cnldO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgcmVmPVwic3RhdGVTZWxlY3RcIiBhdXRvZm9jdXMgb3B0aW9ucz17b3B0aW9uc30gc2ltcGxlVmFsdWUgY2xlYXJhYmxlPXt0aGlzLnN0YXRlLmNsZWFyYWJsZX0gbmFtZT1cInNlbGVjdGVkLXN0YXRlXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdFZhbHVlfSBvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX0gc2VhcmNoYWJsZT17dGhpcy5zdGF0ZS5zZWFyY2hhYmxlfSAvPlxuXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAxNCB9fT5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmZvY3VzU3RhdGVTZWxlY3R9PkZvY3VzIFNlbGVjdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwic2VhcmNoYWJsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuc2VhcmNoYWJsZX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hlY2tib3h9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+U2VhcmNoYWJsZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwiZGlzYWJsZWRcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaGVja2JveH0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5EaXNhYmxlZDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwiY2xlYXJhYmxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGVhcmFibGV9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNoZWNrYm94fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkNsZWFyYWJsZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY291bnRyeSA9PT0gJ0FVJ30gdmFsdWU9XCJBVVwiIG9uQ2hhbmdlPXt0aGlzLnN3aXRjaENvdW50cnl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+QXVzdHJhbGlhPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY291bnRyeSA9PT0gJ1VTJ30gdmFsdWU9XCJVU1wiIG9uQ2hhbmdlPXt0aGlzLnN3aXRjaENvdW50cnl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+VW5pdGVkIFN0YXRlczwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVzRmllbGQ7XG4iLCJleHBvcnRzLkNJVElFUyA9IFtcbiAgeyBuYW1lOiAnQWJpbGVuZScgfSxcbiAgeyBuYW1lOiAnQWRkaXNvbicgfSxcbiAgeyBuYW1lOiAnQWtyb24nIH0sXG4gIHsgbmFtZTogJ0FsYW1lZGEnIH0sXG4gIHsgbmFtZTogJ0FsYmFueScgfSxcbiAgeyBuYW1lOiAnQWxiYW55JyB9LFxuICB7IG5hbWU6ICdBbGJhbnknIH0sXG4gIHsgbmFtZTogJ0FsYnVxdWVycXVlJyB9LFxuICB7IG5hbWU6ICdBbGV4YW5kcmlhJyB9LFxuICB7IG5hbWU6ICdBbGV4YW5kcmlhJyB9LFxuICB7IG5hbWU6ICdBbGhhbWJyYScgfSxcbiAgeyBuYW1lOiAnQWxpc28gVmllam8nIH0sXG4gIHsgbmFtZTogJ0FsbGVuJyB9LFxuICB7IG5hbWU6ICdBbGxlbnRvd24nIH0sXG4gIHsgbmFtZTogJ0FscGhhcmV0dGEnIH0sXG4gIHsgbmFtZTogJ0FsdGFtb250ZSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdBbHRvb25hJyB9LFxuICB7IG5hbWU6ICdBbWFyaWxsbycgfSxcbiAgeyBuYW1lOiAnQW1lcycgfSxcbiAgeyBuYW1lOiAnQW5haGVpbScgfSxcbiAgeyBuYW1lOiAnQW5jaG9yYWdlJyB9LFxuICB7IG5hbWU6ICdBbmRlcnNvbicgfSxcbiAgeyBuYW1lOiAnQW5rZW55JyB9LFxuICB7IG5hbWU6ICdBbm4gQXJib3InIH0sXG4gIHsgbmFtZTogJ0FubmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnQW50aW9jaCcgfSxcbiAgeyBuYW1lOiAnQXBhY2hlIEp1bmN0aW9uJyB9LFxuICB7IG5hbWU6ICdBcGV4JyB9LFxuICB7IG5hbWU6ICdBcG9wa2EnIH0sXG4gIHsgbmFtZTogJ0FwcGxlIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnQXBwbGUgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdBcHBsZXRvbicgfSxcbiAgeyBuYW1lOiAnQXJjYWRpYScgfSxcbiAgeyBuYW1lOiAnQXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdBcmxpbmd0b24gSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnQXJ2YWRhJyB9LFxuICB7IG5hbWU6ICdBc2hldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0F0aGVucy1DbGFya2UgQ291bnR5JyB9LFxuICB7IG5hbWU6ICdBdGxhbnRhJyB9LFxuICB7IG5hbWU6ICdBdGxhbnRpYyBDaXR5JyB9LFxuICB7IG5hbWU6ICdBdHRsZWJvcm8nIH0sXG4gIHsgbmFtZTogJ0F1YnVybicgfSxcbiAgeyBuYW1lOiAnQXVidXJuJyB9LFxuICB7IG5hbWU6ICdBdWd1c3RhLVJpY2htb25kIENvdW50eScgfSxcbiAgeyBuYW1lOiAnQXVyb3JhJyB9LFxuICB7IG5hbWU6ICdBdXJvcmEnIH0sXG4gIHsgbmFtZTogJ0F1c3RpbicgfSxcbiAgeyBuYW1lOiAnQXZlbnR1cmEnIH0sXG4gIHsgbmFtZTogJ0F2b25kYWxlJyB9LFxuICB7IG5hbWU6ICdBenVzYScgfSxcbiAgeyBuYW1lOiAnQmFrZXJzZmllbGQnIH0sXG4gIHsgbmFtZTogJ0JhbGR3aW4gUGFyaycgfSxcbiAgeyBuYW1lOiAnQmFsdGltb3JlJyB9LFxuICB7IG5hbWU6ICdCYXJuc3RhYmxlIFRvd24nIH0sXG4gIHsgbmFtZTogJ0JhcnRsZXR0JyB9LFxuICB7IG5hbWU6ICdCYXJ0bGV0dCcgfSxcbiAgeyBuYW1lOiAnQmF0b24gUm91Z2UnIH0sXG4gIHsgbmFtZTogJ0JhdHRsZSBDcmVlaycgfSxcbiAgeyBuYW1lOiAnQmF5b25uZScgfSxcbiAgeyBuYW1lOiAnQmF5dG93bicgfSxcbiAgeyBuYW1lOiAnQmVhdW1vbnQnIH0sXG4gIHsgbmFtZTogJ0JlYXVtb250JyB9LFxuICB7IG5hbWU6ICdCZWF2ZXJjcmVlaycgfSxcbiAgeyBuYW1lOiAnQmVhdmVydG9uJyB9LFxuICB7IG5hbWU6ICdCZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdCZWxsIEdhcmRlbnMnIH0sXG4gIHsgbmFtZTogJ0JlbGxldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JlbGxldnVlJyB9LFxuICB7IG5hbWU6ICdCZWxsZXZ1ZScgfSxcbiAgeyBuYW1lOiAnQmVsbGZsb3dlcicgfSxcbiAgeyBuYW1lOiAnQmVsbGluZ2hhbScgfSxcbiAgeyBuYW1lOiAnQmVsb2l0JyB9LFxuICB7IG5hbWU6ICdCZW5kJyB9LFxuICB7IG5hbWU6ICdCZW50b252aWxsZScgfSxcbiAgeyBuYW1lOiAnQmVya2VsZXknIH0sXG4gIHsgbmFtZTogJ0Jlcnd5bicgfSxcbiAgeyBuYW1lOiAnQmV0aGxlaGVtJyB9LFxuICB7IG5hbWU6ICdCZXZlcmx5JyB9LFxuICB7IG5hbWU6ICdCaWxsaW5ncycgfSxcbiAgeyBuYW1lOiAnQmlsb3hpJyB9LFxuICB7IG5hbWU6ICdCaW5naGFtdG9uJyB9LFxuICB7IG5hbWU6ICdCaXJtaW5naGFtJyB9LFxuICB7IG5hbWU6ICdCaXNtYXJjaycgfSxcbiAgeyBuYW1lOiAnQmxhY2tzYnVyZycgfSxcbiAgeyBuYW1lOiAnQmxhaW5lJyB9LFxuICB7IG5hbWU6ICdCbG9vbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQmxvb21pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Jsb29taW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCbHVlIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0JvY2EgUmF0b24nIH0sXG4gIHsgbmFtZTogJ0JvaXNlIENpdHknIH0sXG4gIHsgbmFtZTogJ0JvbGluZ2Jyb29rJyB9LFxuICB7IG5hbWU6ICdCb25pdGEgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQm9zc2llciBDaXR5JyB9LFxuICB7IG5hbWU6ICdCb3N0b24nIH0sXG4gIHsgbmFtZTogJ0JvdWxkZXInIH0sXG4gIHsgbmFtZTogJ0JvdW50aWZ1bCcgfSxcbiAgeyBuYW1lOiAnQm93aWUnIH0sXG4gIHsgbmFtZTogJ0Jvd2xpbmcgR3JlZW4nIH0sXG4gIHsgbmFtZTogJ0JveW50b24gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0JvemVtYW4nIH0sXG4gIHsgbmFtZTogJ0JyYWRlbnRvbicgfSxcbiAgeyBuYW1lOiAnQnJlYScgfSxcbiAgeyBuYW1lOiAnQnJlbWVydG9uJyB9LFxuICB7IG5hbWU6ICdCcmVudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0JyZW50d29vZCcgfSxcbiAgeyBuYW1lOiAnQnJpZGdlcG9ydCcgfSxcbiAgeyBuYW1lOiAnQnJpc3RvbCcgfSxcbiAgeyBuYW1lOiAnQnJvY2t0b24nIH0sXG4gIHsgbmFtZTogJ0Jyb2tlbiBBcnJvdycgfSxcbiAgeyBuYW1lOiAnQnJvb2tmaWVsZCcgfSxcbiAgeyBuYW1lOiAnQnJvb2toYXZlbicgfSxcbiAgeyBuYW1lOiAnQnJvb2tseW4gUGFyaycgfSxcbiAgeyBuYW1lOiAnQnJvb21maWVsZCcgfSxcbiAgeyBuYW1lOiAnQnJvd25zdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JyeWFuJyB9LFxuICB7IG5hbWU6ICdCdWNrZXllJyB9LFxuICB7IG5hbWU6ICdCdWVuYSBQYXJrJyB9LFxuICB7IG5hbWU6ICdCdWZmYWxvJyB9LFxuICB7IG5hbWU6ICdCdWZmYWxvIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdCdWxsaGVhZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdCdXJiYW5rJyB9LFxuICB7IG5hbWU6ICdCdXJpZW4nIH0sXG4gIHsgbmFtZTogJ0J1cmxlc29uJyB9LFxuICB7IG5hbWU6ICdCdXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCdXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCdXJuc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDYWxkd2VsbCcgfSxcbiAgeyBuYW1lOiAnQ2FsZXhpY28nIH0sXG4gIHsgbmFtZTogJ0NhbHVtZXQgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ2FtYXJpbGxvJyB9LFxuICB7IG5hbWU6ICdDYW1icmlkZ2UnIH0sXG4gIHsgbmFtZTogJ0NhbWRlbicgfSxcbiAgeyBuYW1lOiAnQ2FtcGJlbGwnIH0sXG4gIHsgbmFtZTogJ0NhbnRvbicgfSxcbiAgeyBuYW1lOiAnQ2FwZSBDb3JhbCcgfSxcbiAgeyBuYW1lOiAnQ2FwZSBHaXJhcmRlYXUnIH0sXG4gIHsgbmFtZTogJ0NhcmxzYmFkJyB9LFxuICB7IG5hbWU6ICdDYXJtZWwnIH0sXG4gIHsgbmFtZTogJ0Nhcm9sIFN0cmVhbScgfSxcbiAgeyBuYW1lOiAnQ2FycGVudGVyc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDYXJyb2xsdG9uJyB9LFxuICB7IG5hbWU6ICdDYXJzb24nIH0sXG4gIHsgbmFtZTogJ0NhcnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdDYXJ5JyB9LFxuICB7IG5hbWU6ICdDYXNhIEdyYW5kZScgfSxcbiAgeyBuYW1lOiAnQ2FzcGVyJyB9LFxuICB7IG5hbWU6ICdDYXN0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnQ2F0aGVkcmFsIENpdHknIH0sXG4gIHsgbmFtZTogJ0NlZGFyIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdDZWRhciBIaWxsJyB9LFxuICB7IG5hbWU6ICdDZWRhciBQYXJrJyB9LFxuICB7IG5hbWU6ICdDZWRhciBSYXBpZHMnIH0sXG4gIHsgbmFtZTogJ0NlbnRlbm5pYWwnIH0sXG4gIHsgbmFtZTogJ0NlcmVzJyB9LFxuICB7IG5hbWU6ICdDZXJyaXRvcycgfSxcbiAgeyBuYW1lOiAnQ2hhbXBhaWduJyB9LFxuICB7IG5hbWU6ICdDaGFuZGxlcicgfSxcbiAgeyBuYW1lOiAnQ2hhcGVsIEhpbGwnIH0sXG4gIHsgbmFtZTogJ0NoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ0NoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ0NoYXJsb3R0ZScgfSxcbiAgeyBuYW1lOiAnQ2hhcmxvdHRlc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDaGF0dGFub29nYScgfSxcbiAgeyBuYW1lOiAnQ2hlbHNlYScgfSxcbiAgeyBuYW1lOiAnQ2hlc2FwZWFrZScgfSxcbiAgeyBuYW1lOiAnQ2hlc3RlcmZpZWxkJyB9LFxuICB7IG5hbWU6ICdDaGV5ZW5uZScgfSxcbiAgeyBuYW1lOiAnQ2hpY2FnbycgfSxcbiAgeyBuYW1lOiAnQ2hpY28nIH0sXG4gIHsgbmFtZTogJ0NoaWNvcGVlJyB9LFxuICB7IG5hbWU6ICdDaGlubycgfSxcbiAgeyBuYW1lOiAnQ2hpbm8gSGlsbHMnIH0sXG4gIHsgbmFtZTogJ0NodWxhIFZpc3RhJyB9LFxuICB7IG5hbWU6ICdDaWNlcm8nIH0sXG4gIHsgbmFtZTogJ0NpbmNpbm5hdGknIH0sXG4gIHsgbmFtZTogJ0NpdHJ1cyBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdDbGFya3N2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2xlYXJ3YXRlcicgfSxcbiAgeyBuYW1lOiAnQ2xldmVsYW5kJyB9LFxuICB7IG5hbWU6ICdDbGV2ZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0NsZXZlbGFuZCBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdDbGlmdG9uJyB9LFxuICB7IG5hbWU6ICdDbG92aXMnIH0sXG4gIHsgbmFtZTogJ0Nsb3ZpcycgfSxcbiAgeyBuYW1lOiAnQ29hY2hlbGxhJyB9LFxuICB7IG5hbWU6ICdDb2NvbnV0IENyZWVrJyB9LFxuICB7IG5hbWU6ICdDb2V1ciBkXFwnQWxlbmUnIH0sXG4gIHsgbmFtZTogJ0NvbGxlZ2UgU3RhdGlvbicgfSxcbiAgeyBuYW1lOiAnQ29sbGllcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdDb2xvcmFkbyBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdDb2x0b24nIH0sXG4gIHsgbmFtZTogJ0NvbHVtYmlhJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJpYScgfSxcbiAgeyBuYW1lOiAnQ29sdW1idXMnIH0sXG4gIHsgbmFtZTogJ0NvbHVtYnVzJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJ1cycgfSxcbiAgeyBuYW1lOiAnQ29tbWVyY2UgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ29tcHRvbicgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29ucm9lJyB9LFxuICB7IG5hbWU6ICdDb253YXknIH0sXG4gIHsgbmFtZTogJ0Nvb24gUmFwaWRzJyB9LFxuICB7IG5hbWU6ICdDb3BwZWxsJyB9LFxuICB7IG5hbWU6ICdDb3JhbCBHYWJsZXMnIH0sXG4gIHsgbmFtZTogJ0NvcmFsIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0Nvcm9uYScgfSxcbiAgeyBuYW1lOiAnQ29ycHVzIENocmlzdGknIH0sXG4gIHsgbmFtZTogJ0NvcnZhbGxpcycgfSxcbiAgeyBuYW1lOiAnQ29zdGEgTWVzYScgfSxcbiAgeyBuYW1lOiAnQ291bmNpbCBCbHVmZnMnIH0sXG4gIHsgbmFtZTogJ0NvdmluYScgfSxcbiAgeyBuYW1lOiAnQ292aW5ndG9uJyB9LFxuICB7IG5hbWU6ICdDcmFuc3RvbicgfSxcbiAgeyBuYW1lOiAnQ3J5c3RhbCBMYWtlJyB9LFxuICB7IG5hbWU6ICdDdWx2ZXIgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ3VwZXJ0aW5vJyB9LFxuICB7IG5hbWU6ICdDdXRsZXIgQmF5JyB9LFxuICB7IG5hbWU6ICdDdXlhaG9nYSBGYWxscycgfSxcbiAgeyBuYW1lOiAnQ3lwcmVzcycgfSxcbiAgeyBuYW1lOiAnRGFsbGFzJyB9LFxuICB7IG5hbWU6ICdEYWx5IENpdHknIH0sXG4gIHsgbmFtZTogJ0RhbmJ1cnknIH0sXG4gIHsgbmFtZTogJ0RhbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdEYW52aWxsZScgfSxcbiAgeyBuYW1lOiAnRGF2ZW5wb3J0JyB9LFxuICB7IG5hbWU6ICdEYXZpZScgfSxcbiAgeyBuYW1lOiAnRGF2aXMnIH0sXG4gIHsgbmFtZTogJ0RheXRvbicgfSxcbiAgeyBuYW1lOiAnRGF5dG9uYSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnRGVLYWxiJyB9LFxuICB7IG5hbWU6ICdEZVNvdG8nIH0sXG4gIHsgbmFtZTogJ0RlYXJib3JuJyB9LFxuICB7IG5hbWU6ICdEZWFyYm9ybiBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdEZWNhdHVyJyB9LFxuICB7IG5hbWU6ICdEZWNhdHVyJyB9LFxuICB7IG5hbWU6ICdEZWVyZmllbGQgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0RlbGFubycgfSxcbiAgeyBuYW1lOiAnRGVscmF5IEJlYWNoJyB9LFxuICB7IG5hbWU6ICdEZWx0b25hJyB9LFxuICB7IG5hbWU6ICdEZW50b24nIH0sXG4gIHsgbmFtZTogJ0RlbnZlcicgfSxcbiAgeyBuYW1lOiAnRGVzIE1vaW5lcycgfSxcbiAgeyBuYW1lOiAnRGVzIFBsYWluZXMnIH0sXG4gIHsgbmFtZTogJ0RldHJvaXQnIH0sXG4gIHsgbmFtZTogJ0RpYW1vbmQgQmFyJyB9LFxuICB7IG5hbWU6ICdEb3JhbCcgfSxcbiAgeyBuYW1lOiAnRG90aGFuJyB9LFxuICB7IG5hbWU6ICdEb3ZlcicgfSxcbiAgeyBuYW1lOiAnRG93bmVycyBHcm92ZScgfSxcbiAgeyBuYW1lOiAnRG93bmV5JyB9LFxuICB7IG5hbWU6ICdEcmFwZXInIH0sXG4gIHsgbmFtZTogJ0R1YmxpbicgfSxcbiAgeyBuYW1lOiAnRHVibGluJyB9LFxuICB7IG5hbWU6ICdEdWJ1cXVlJyB9LFxuICB7IG5hbWU6ICdEdWx1dGgnIH0sXG4gIHsgbmFtZTogJ0R1bmNhbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdEdW53b29keScgfSxcbiAgeyBuYW1lOiAnRHVyaGFtJyB9LFxuICB7IG5hbWU6ICdFYWdhbicgfSxcbiAgeyBuYW1lOiAnRWFzdCBMYW5zaW5nJyB9LFxuICB7IG5hbWU6ICdFYXN0IE9yYW5nZScgfSxcbiAgeyBuYW1lOiAnRWFzdCBQcm92aWRlbmNlJyB9LFxuICB7IG5hbWU6ICdFYXN0dmFsZScgfSxcbiAgeyBuYW1lOiAnRWF1IENsYWlyZScgfSxcbiAgeyBuYW1lOiAnRWRlbiBQcmFpcmllJyB9LFxuICB7IG5hbWU6ICdFZGluYScgfSxcbiAgeyBuYW1lOiAnRWRpbmJ1cmcnIH0sXG4gIHsgbmFtZTogJ0VkbW9uZCcgfSxcbiAgeyBuYW1lOiAnRWRtb25kcycgfSxcbiAgeyBuYW1lOiAnRWwgQ2Fqb24nIH0sXG4gIHsgbmFtZTogJ0VsIENlbnRybycgfSxcbiAgeyBuYW1lOiAnRWwgTW9udGUnIH0sXG4gIHsgbmFtZTogJ0VsIFBhc28nIH0sXG4gIHsgbmFtZTogJ0VsZ2luJyB9LFxuICB7IG5hbWU6ICdFbGl6YWJldGgnIH0sXG4gIHsgbmFtZTogJ0VsayBHcm92ZScgfSxcbiAgeyBuYW1lOiAnRWxraGFydCcgfSxcbiAgeyBuYW1lOiAnRWxtaHVyc3QnIH0sXG4gIHsgbmFtZTogJ0VseXJpYScgfSxcbiAgeyBuYW1lOiAnRW5jaW5pdGFzJyB9LFxuICB7IG5hbWU6ICdFbmlkJyB9LFxuICB7IG5hbWU6ICdFcmllJyB9LFxuICB7IG5hbWU6ICdFc2NvbmRpZG8nIH0sXG4gIHsgbmFtZTogJ0V1Y2xpZCcgfSxcbiAgeyBuYW1lOiAnRXVnZW5lJyB9LFxuICB7IG5hbWU6ICdFdWxlc3MnIH0sXG4gIHsgbmFtZTogJ0V2YW5zdG9uJyB9LFxuICB7IG5hbWU6ICdFdmFuc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdFdmVyZXR0JyB9LFxuICB7IG5hbWU6ICdFdmVyZXR0JyB9LFxuICB7IG5hbWU6ICdGYWlyZmllbGQnIH0sXG4gIHsgbmFtZTogJ0ZhaXJmaWVsZCcgfSxcbiAgeyBuYW1lOiAnRmFsbCBSaXZlcicgfSxcbiAgeyBuYW1lOiAnRmFyZ28nIH0sXG4gIHsgbmFtZTogJ0Zhcm1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Zhcm1pbmd0b24gSGlsbHMnIH0sXG4gIHsgbmFtZTogJ0ZheWV0dGV2aWxsZScgfSxcbiAgeyBuYW1lOiAnRmF5ZXR0ZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdGZWRlcmFsIFdheScgfSxcbiAgeyBuYW1lOiAnRmluZGxheScgfSxcbiAgeyBuYW1lOiAnRmlzaGVycycgfSxcbiAgeyBuYW1lOiAnRml0Y2hidXJnJyB9LFxuICB7IG5hbWU6ICdGbGFnc3RhZmYnIH0sXG4gIHsgbmFtZTogJ0ZsaW50JyB9LFxuICB7IG5hbWU6ICdGbG9yZW5jZScgfSxcbiAgeyBuYW1lOiAnRmxvcmVuY2UnIH0sXG4gIHsgbmFtZTogJ0Zsb3Jpc3NhbnQnIH0sXG4gIHsgbmFtZTogJ0Zsb3dlciBNb3VuZCcgfSxcbiAgeyBuYW1lOiAnRm9sc29tJyB9LFxuICB7IG5hbWU6ICdGb25kIGR1IExhYycgfSxcbiAgeyBuYW1lOiAnRm9udGFuYScgfSxcbiAgeyBuYW1lOiAnRm9ydCBDb2xsaW5zJyB9LFxuICB7IG5hbWU6ICdGb3J0IExhdWRlcmRhbGUnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgTXllcnMnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgUGllcmNlJyB9LFxuICB7IG5hbWU6ICdGb3J0IFNtaXRoJyB9LFxuICB7IG5hbWU6ICdGb3J0IFdheW5lJyB9LFxuICB7IG5hbWU6ICdGb3J0IFdvcnRoJyB9LFxuICB7IG5hbWU6ICdGb3VudGFpbiBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0ZyYW5rbGluJyB9LFxuICB7IG5hbWU6ICdGcmVkZXJpY2snIH0sXG4gIHsgbmFtZTogJ0ZyZWVwb3J0JyB9LFxuICB7IG5hbWU6ICdGcmVtb250JyB9LFxuICB7IG5hbWU6ICdGcmVzbm8nIH0sXG4gIHsgbmFtZTogJ0ZyaWVuZHN3b29kJyB9LFxuICB7IG5hbWU6ICdGcmlzY28nIH0sXG4gIHsgbmFtZTogJ0Z1bGxlcnRvbicgfSxcbiAgeyBuYW1lOiAnR2FpbmVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0dhaXRoZXJzYnVyZycgfSxcbiAgeyBuYW1lOiAnR2FsdmVzdG9uJyB9LFxuICB7IG5hbWU6ICdHYXJkZW4gR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0dhcmRlbmEnIH0sXG4gIHsgbmFtZTogJ0dhcmxhbmQnIH0sXG4gIHsgbmFtZTogJ0dhcnknIH0sXG4gIHsgbmFtZTogJ0dhc3RvbmlhJyB9LFxuICB7IG5hbWU6ICdHZW9yZ2V0b3duJyB9LFxuICB7IG5hbWU6ICdHZXJtYW50b3duJyB9LFxuICB7IG5hbWU6ICdHaWxiZXJ0JyB9LFxuICB7IG5hbWU6ICdHaWxyb3knIH0sXG4gIHsgbmFtZTogJ0dsZW5kYWxlJyB9LFxuICB7IG5hbWU6ICdHbGVuZGFsZScgfSxcbiAgeyBuYW1lOiAnR2xlbmRvcmEnIH0sXG4gIHsgbmFtZTogJ0dsZW52aWV3JyB9LFxuICB7IG5hbWU6ICdHb29keWVhcicgfSxcbiAgeyBuYW1lOiAnR29vc2UgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIEZvcmtzJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBJc2xhbmQnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIEp1bmN0aW9uJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBQcmFpcmllJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBSYXBpZHMnIH0sXG4gIHsgbmFtZTogJ0dyYXBldmluZScgfSxcbiAgeyBuYW1lOiAnR3JlYXQgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ0dyZWVsZXknIH0sXG4gIHsgbmFtZTogJ0dyZWVuIEJheScgfSxcbiAgeyBuYW1lOiAnR3JlZW5hY3JlcycgfSxcbiAgeyBuYW1lOiAnR3JlZW5maWVsZCcgfSxcbiAgeyBuYW1lOiAnR3JlZW5zYm9ybycgfSxcbiAgeyBuYW1lOiAnR3JlZW52aWxsZScgfSxcbiAgeyBuYW1lOiAnR3JlZW52aWxsZScgfSxcbiAgeyBuYW1lOiAnR3JlZW53b29kJyB9LFxuICB7IG5hbWU6ICdHcmVzaGFtJyB9LFxuICB7IG5hbWU6ICdHcm92ZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdHdWxmcG9ydCcgfSxcbiAgeyBuYW1lOiAnSGFja2Vuc2FjaycgfSxcbiAgeyBuYW1lOiAnSGFnZXJzdG93bicgfSxcbiAgeyBuYW1lOiAnSGFsbGFuZGFsZSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnSGFsdG9tIENpdHknIH0sXG4gIHsgbmFtZTogJ0hhbWlsdG9uJyB9LFxuICB7IG5hbWU6ICdIYW1tb25kJyB9LFxuICB7IG5hbWU6ICdIYW1wdG9uJyB9LFxuICB7IG5hbWU6ICdIYW5mb3JkJyB9LFxuICB7IG5hbWU6ICdIYW5vdmVyIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0hhcmxpbmdlbicgfSxcbiAgeyBuYW1lOiAnSGFycmlzYnVyZycgfSxcbiAgeyBuYW1lOiAnSGFycmlzb25idXJnJyB9LFxuICB7IG5hbWU6ICdIYXJ0Zm9yZCcgfSxcbiAgeyBuYW1lOiAnSGF0dGllc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0hhdmVyaGlsbCcgfSxcbiAgeyBuYW1lOiAnSGF3dGhvcm5lJyB9LFxuICB7IG5hbWU6ICdIYXl3YXJkJyB9LFxuICB7IG5hbWU6ICdIZW1ldCcgfSxcbiAgeyBuYW1lOiAnSGVtcHN0ZWFkJyB9LFxuICB7IG5hbWU6ICdIZW5kZXJzb24nIH0sXG4gIHsgbmFtZTogJ0hlbmRlcnNvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdIZXNwZXJpYScgfSxcbiAgeyBuYW1lOiAnSGlhbGVhaCcgfSxcbiAgeyBuYW1lOiAnSGlja29yeScgfSxcbiAgeyBuYW1lOiAnSGlnaCBQb2ludCcgfSxcbiAgeyBuYW1lOiAnSGlnaGxhbmQnIH0sXG4gIHsgbmFtZTogJ0hpbGxzYm9ybycgfSxcbiAgeyBuYW1lOiAnSGlsdG9uIEhlYWQgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdIb2Jva2VuJyB9LFxuICB7IG5hbWU6ICdIb2ZmbWFuIEVzdGF0ZXMnIH0sXG4gIHsgbmFtZTogJ0hvbGx5d29vZCcgfSxcbiAgeyBuYW1lOiAnSG9seW9rZScgfSxcbiAgeyBuYW1lOiAnSG9tZXN0ZWFkJyB9LFxuICB7IG5hbWU6ICdIb25vbHVsdScgfSxcbiAgeyBuYW1lOiAnSG9vdmVyJyB9LFxuICB7IG5hbWU6ICdIb3VzdG9uJyB9LFxuICB7IG5hbWU6ICdIdWJlciBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdIdW50ZXJzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24nIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24gUGFyaycgfSxcbiAgeyBuYW1lOiAnSHVudHN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSHVudHN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSHVyc3QnIH0sXG4gIHsgbmFtZTogJ0h1dGNoaW5zb24nIH0sXG4gIHsgbmFtZTogJ0lkYWhvIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdJbmRlcGVuZGVuY2UnIH0sXG4gIHsgbmFtZTogJ0luZGlhbmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnSW5kaW8nIH0sXG4gIHsgbmFtZTogJ0luZ2xld29vZCcgfSxcbiAgeyBuYW1lOiAnSW93YSBDaXR5JyB9LFxuICB7IG5hbWU6ICdJcnZpbmUnIH0sXG4gIHsgbmFtZTogJ0lydmluZycgfSxcbiAgeyBuYW1lOiAnSmFja3NvbicgfSxcbiAgeyBuYW1lOiAnSmFja3NvbicgfSxcbiAgeyBuYW1lOiAnSmFja3NvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdKYWNrc29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0phbmVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0plZmZlcnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdKZWZmZXJzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSmVyc2V5IENpdHknIH0sXG4gIHsgbmFtZTogJ0pvaG5zIENyZWVrJyB9LFxuICB7IG5hbWU6ICdKb2huc29uIENpdHknIH0sXG4gIHsgbmFtZTogJ0pvbGlldCcgfSxcbiAgeyBuYW1lOiAnSm9uZXNib3JvJyB9LFxuICB7IG5hbWU6ICdKb3BsaW4nIH0sXG4gIHsgbmFtZTogJ0p1cGl0ZXInIH0sXG4gIHsgbmFtZTogJ0p1cnVwYSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0thbGFtYXpvbycgfSxcbiAgeyBuYW1lOiAnS2FubmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnS2Fuc2FzIENpdHknIH0sXG4gIHsgbmFtZTogJ0thbnNhcyBDaXR5JyB9LFxuICB7IG5hbWU6ICdLZWFybnknIH0sXG4gIHsgbmFtZTogJ0tlaXplcicgfSxcbiAgeyBuYW1lOiAnS2VsbGVyJyB9LFxuICB7IG5hbWU6ICdLZW5uZXInIH0sXG4gIHsgbmFtZTogJ0tlbm5ld2ljaycgfSxcbiAgeyBuYW1lOiAnS2Vub3NoYScgfSxcbiAgeyBuYW1lOiAnS2VudCcgfSxcbiAgeyBuYW1lOiAnS2VudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0tldHRlcmluZycgfSxcbiAgeyBuYW1lOiAnS2lsbGVlbicgfSxcbiAgeyBuYW1lOiAnS2luZ3Nwb3J0JyB9LFxuICB7IG5hbWU6ICdLaXJrbGFuZCcgfSxcbiAgeyBuYW1lOiAnS2lzc2ltbWVlJyB9LFxuICB7IG5hbWU6ICdLbm94dmlsbGUnIH0sXG4gIHsgbmFtZTogJ0tva29tbycgfSxcbiAgeyBuYW1lOiAnTGEgQ3Jvc3NlJyB9LFxuICB7IG5hbWU6ICdMYSBIYWJyYScgfSxcbiAgeyBuYW1lOiAnTGEgTWVzYScgfSxcbiAgeyBuYW1lOiAnTGEgTWlyYWRhJyB9LFxuICB7IG5hbWU6ICdMYSBQdWVudGUnIH0sXG4gIHsgbmFtZTogJ0xhIFF1aW50YScgfSxcbiAgeyBuYW1lOiAnTGFjZXknIH0sXG4gIHsgbmFtZTogJ0xhZmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGFmYXlldHRlJyB9LFxuICB7IG5hbWU6ICdMYWd1bmEgTmlndWVsJyB9LFxuICB7IG5hbWU6ICdMYWtlIENoYXJsZXMnIH0sXG4gIHsgbmFtZTogJ0xha2UgRWxzaW5vcmUnIH0sXG4gIHsgbmFtZTogJ0xha2UgRm9yZXN0JyB9LFxuICB7IG5hbWU6ICdMYWtlIEhhdmFzdSBDaXR5JyB9LFxuICB7IG5hbWU6ICdMYWtlIE9zd2VnbycgfSxcbiAgeyBuYW1lOiAnTGFrZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0xha2V2aWxsZScgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYWtld29vZCcgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuY2FzdGVyJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuc2luZycgfSxcbiAgeyBuYW1lOiAnTGFyZWRvJyB9LFxuICB7IG5hbWU6ICdMYXJnbycgfSxcbiAgeyBuYW1lOiAnTGFzIENydWNlcycgfSxcbiAgeyBuYW1lOiAnTGFzIFZlZ2FzJyB9LFxuICB7IG5hbWU6ICdMYXVkZXJoaWxsJyB9LFxuICB7IG5hbWU6ICdMYXdyZW5jZScgfSxcbiAgeyBuYW1lOiAnTGF3cmVuY2UnIH0sXG4gIHsgbmFtZTogJ0xhd3JlbmNlJyB9LFxuICB7IG5hbWU6ICdMYXd0b24nIH0sXG4gIHsgbmFtZTogJ0xheXRvbicgfSxcbiAgeyBuYW1lOiAnTGVhZ3VlIENpdHknIH0sXG4gIHsgbmFtZTogJ0xlZVxcJ3MgU3VtbWl0JyB9LFxuICB7IG5hbWU6ICdMZWVzYnVyZycgfSxcbiAgeyBuYW1lOiAnTGVoaScgfSxcbiAgeyBuYW1lOiAnTGVuZXhhJyB9LFxuICB7IG5hbWU6ICdMZW9taW5zdGVyJyB9LFxuICB7IG5hbWU6ICdMZXdpc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdMZXhpbmd0b24tRmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGltYScgfSxcbiAgeyBuYW1lOiAnTGluY29sbicgfSxcbiAgeyBuYW1lOiAnTGluY29sbicgfSxcbiAgeyBuYW1lOiAnTGluY29sbiBQYXJrJyB9LFxuICB7IG5hbWU6ICdMaW5kZW4nIH0sXG4gIHsgbmFtZTogJ0xpdHRsZSBSb2NrJyB9LFxuICB7IG5hbWU6ICdMaXR0bGV0b24nIH0sXG4gIHsgbmFtZTogJ0xpdmVybW9yZScgfSxcbiAgeyBuYW1lOiAnTGl2b25pYScgfSxcbiAgeyBuYW1lOiAnTG9kaScgfSxcbiAgeyBuYW1lOiAnTG9nYW4nIH0sXG4gIHsgbmFtZTogJ0xvbWJhcmQnIH0sXG4gIHsgbmFtZTogJ0xvbXBvYycgfSxcbiAgeyBuYW1lOiAnTG9uZyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTG9uZ21vbnQnIH0sXG4gIHsgbmFtZTogJ0xvbmd2aWV3JyB9LFxuICB7IG5hbWU6ICdMb3JhaW4nIH0sXG4gIHsgbmFtZTogJ0xvcyBBbmdlbGVzJyB9LFxuICB7IG5hbWU6ICdMb3Vpc3ZpbGxlL0plZmZlcnNvbiBDb3VudHknIH0sXG4gIHsgbmFtZTogJ0xvdmVsYW5kJyB9LFxuICB7IG5hbWU6ICdMb3dlbGwnIH0sXG4gIHsgbmFtZTogJ0x1YmJvY2snIH0sXG4gIHsgbmFtZTogJ0x5bmNoYnVyZycgfSxcbiAgeyBuYW1lOiAnTHlubicgfSxcbiAgeyBuYW1lOiAnTHlud29vZCcgfSxcbiAgeyBuYW1lOiAnTWFjb24nIH0sXG4gIHsgbmFtZTogJ01hZGVyYScgfSxcbiAgeyBuYW1lOiAnTWFkaXNvbicgfSxcbiAgeyBuYW1lOiAnTWFkaXNvbicgfSxcbiAgeyBuYW1lOiAnTWFsZGVuJyB9LFxuICB7IG5hbWU6ICdNYW5hc3NhcycgfSxcbiAgeyBuYW1lOiAnTWFuY2hlc3RlcicgfSxcbiAgeyBuYW1lOiAnTWFuaGF0dGFuJyB9LFxuICB7IG5hbWU6ICdNYW5rYXRvJyB9LFxuICB7IG5hbWU6ICdNYW5zZmllbGQnIH0sXG4gIHsgbmFtZTogJ01hbnNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnTWFudGVjYScgfSxcbiAgeyBuYW1lOiAnTWFwbGUgR3JvdmUnIH0sXG4gIHsgbmFtZTogJ01hcGxld29vZCcgfSxcbiAgeyBuYW1lOiAnTWFyYW5hJyB9LFxuICB7IG5hbWU6ICdNYXJnYXRlJyB9LFxuICB7IG5hbWU6ICdNYXJpY29wYScgfSxcbiAgeyBuYW1lOiAnTWFyaWV0dGEnIH0sXG4gIHsgbmFtZTogJ01hcmxib3JvdWdoJyB9LFxuICB7IG5hbWU6ICdNYXJ0aW5leicgfSxcbiAgeyBuYW1lOiAnTWFyeXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnTWNBbGxlbicgfSxcbiAgeyBuYW1lOiAnTWNLaW5uZXknIH0sXG4gIHsgbmFtZTogJ01lZGZvcmQnIH0sXG4gIHsgbmFtZTogJ01lZGZvcmQnIH0sXG4gIHsgbmFtZTogJ01lbGJvdXJuZScgfSxcbiAgeyBuYW1lOiAnTWVtcGhpcycgfSxcbiAgeyBuYW1lOiAnTWVuaWZlZScgfSxcbiAgeyBuYW1lOiAnTWVudG9yJyB9LFxuICB7IG5hbWU6ICdNZXJjZWQnIH0sXG4gIHsgbmFtZTogJ01lcmlkZW4nIH0sXG4gIHsgbmFtZTogJ01lcmlkaWFuJyB9LFxuICB7IG5hbWU6ICdNZXJpZGlhbicgfSxcbiAgeyBuYW1lOiAnTWVzYScgfSxcbiAgeyBuYW1lOiAnTWVzcXVpdGUnIH0sXG4gIHsgbmFtZTogJ01ldGh1ZW4nIH0sXG4gIHsgbmFtZTogJ01pYW1pJyB9LFxuICB7IG5hbWU6ICdNaWFtaSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTWlhbWkgR2FyZGVucycgfSxcbiAgeyBuYW1lOiAnTWlkZGxldG93bicgfSxcbiAgeyBuYW1lOiAnTWlkZGxldG93bicgfSxcbiAgeyBuYW1lOiAnTWlkbGFuZCcgfSxcbiAgeyBuYW1lOiAnTWlkbGFuZCcgfSxcbiAgeyBuYW1lOiAnTWlkd2VzdCBDaXR5JyB9LFxuICB7IG5hbWU6ICdNaWxmb3JkJyB9LFxuICB7IG5hbWU6ICdNaWxwaXRhcycgfSxcbiAgeyBuYW1lOiAnTWlsd2F1a2VlJyB9LFxuICB7IG5hbWU6ICdNaW5uZWFwb2xpcycgfSxcbiAgeyBuYW1lOiAnTWlubmV0b25rYScgfSxcbiAgeyBuYW1lOiAnTWlub3QnIH0sXG4gIHsgbmFtZTogJ01pcmFtYXInIH0sXG4gIHsgbmFtZTogJ01pc2hhd2FrYScgfSxcbiAgeyBuYW1lOiAnTWlzc2lvbicgfSxcbiAgeyBuYW1lOiAnTWlzc2lvbiBWaWVqbycgfSxcbiAgeyBuYW1lOiAnTWlzc291bGEnIH0sXG4gIHsgbmFtZTogJ01pc3NvdXJpIENpdHknIH0sXG4gIHsgbmFtZTogJ01vYmlsZScgfSxcbiAgeyBuYW1lOiAnTW9kZXN0bycgfSxcbiAgeyBuYW1lOiAnTW9saW5lJyB9LFxuICB7IG5hbWU6ICdNb25yb2UnIH0sXG4gIHsgbmFtZTogJ01vbnJvdmlhJyB9LFxuICB7IG5hbWU6ICdNb250Y2xhaXInIH0sXG4gIHsgbmFtZTogJ01vbnRlYmVsbG8nIH0sXG4gIHsgbmFtZTogJ01vbnRlcmV5IFBhcmsnIH0sXG4gIHsgbmFtZTogJ01vbnRnb21lcnknIH0sXG4gIHsgbmFtZTogJ01vb3JlJyB9LFxuICB7IG5hbWU6ICdNb29yaGVhZCcgfSxcbiAgeyBuYW1lOiAnTW9yZW5vIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnTW9yZ2FuIEhpbGwnIH0sXG4gIHsgbmFtZTogJ01vdW50IFBsZWFzYW50JyB9LFxuICB7IG5hbWU6ICdNb3VudCBQcm9zcGVjdCcgfSxcbiAgeyBuYW1lOiAnTW91bnQgVmVybm9uJyB9LFxuICB7IG5hbWU6ICdNb3VudGFpbiBWaWV3JyB9LFxuICB7IG5hbWU6ICdNdW5jaWUnIH0sXG4gIHsgbmFtZTogJ011cmZyZWVzYm9ybycgfSxcbiAgeyBuYW1lOiAnTXVycmF5JyB9LFxuICB7IG5hbWU6ICdNdXJyaWV0YScgfSxcbiAgeyBuYW1lOiAnTXVza2Vnb24nIH0sXG4gIHsgbmFtZTogJ011c2tvZ2VlJyB9LFxuICB7IG5hbWU6ICdOYW1wYScgfSxcbiAgeyBuYW1lOiAnTmFwYScgfSxcbiAgeyBuYW1lOiAnTmFwZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnTmFzaHVhJyB9LFxuICB7IG5hbWU6ICdOYXNodmlsbGUtRGF2aWRzb24nIH0sXG4gIHsgbmFtZTogJ05hdGlvbmFsIENpdHknIH0sXG4gIHsgbmFtZTogJ05ldyBCZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdOZXcgQmVybGluJyB9LFxuICB7IG5hbWU6ICdOZXcgQnJhdW5mZWxzJyB9LFxuICB7IG5hbWU6ICdOZXcgQnJpdGFpbicgfSxcbiAgeyBuYW1lOiAnTmV3IEJydW5zd2ljaycgfSxcbiAgeyBuYW1lOiAnTmV3IEhhdmVuJyB9LFxuICB7IG5hbWU6ICdOZXcgT3JsZWFucycgfSxcbiAgeyBuYW1lOiAnTmV3IFJvY2hlbGxlJyB9LFxuICB7IG5hbWU6ICdOZXcgWW9yaycgfSxcbiAgeyBuYW1lOiAnTmV3YXJrJyB9LFxuICB7IG5hbWU6ICdOZXdhcmsnIH0sXG4gIHsgbmFtZTogJ05ld2FyaycgfSxcbiAgeyBuYW1lOiAnTmV3cG9ydCBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTmV3cG9ydCBOZXdzJyB9LFxuICB7IG5hbWU6ICdOZXd0b24nIH0sXG4gIHsgbmFtZTogJ05pYWdhcmEgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ05vYmxlc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdOb3Jmb2xrJyB9LFxuICB7IG5hbWU6ICdOb3JtYWwnIH0sXG4gIHsgbmFtZTogJ05vcm1hbicgfSxcbiAgeyBuYW1lOiAnTm9ydGggQ2hhcmxlc3RvbicgfSxcbiAgeyBuYW1lOiAnTm9ydGggTGFzIFZlZ2FzJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBMYXVkZXJkYWxlJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBMaXR0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnTm9ydGggTWlhbWknIH0sXG4gIHsgbmFtZTogJ05vcnRoIE1pYW1pIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBQb3J0JyB9LFxuICB7IG5hbWU6ICdOb3J0aCBSaWNobGFuZCBIaWxscycgfSxcbiAgeyBuYW1lOiAnTm9ydGhnbGVubicgfSxcbiAgeyBuYW1lOiAnTm9yd2FsaycgfSxcbiAgeyBuYW1lOiAnTm9yd2FsaycgfSxcbiAgeyBuYW1lOiAnTm9yd2ljaCcgfSxcbiAgeyBuYW1lOiAnTm92YXRvJyB9LFxuICB7IG5hbWU6ICdOb3ZpJyB9LFxuICB7IG5hbWU6ICdPXFwnRmFsbG9uJyB9LFxuICB7IG5hbWU6ICdPYWsgTGF3bicgfSxcbiAgeyBuYW1lOiAnT2FrIFBhcmsnIH0sXG4gIHsgbmFtZTogJ09ha2xhbmQnIH0sXG4gIHsgbmFtZTogJ09ha2xhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT2FrbGV5JyB9LFxuICB7IG5hbWU6ICdPY2FsYScgfSxcbiAgeyBuYW1lOiAnT2NlYW5zaWRlJyB9LFxuICB7IG5hbWU6ICdPY29lZScgfSxcbiAgeyBuYW1lOiAnT2Rlc3NhJyB9LFxuICB7IG5hbWU6ICdPZ2RlbicgfSxcbiAgeyBuYW1lOiAnT2tsYWhvbWEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnT2xhdGhlJyB9LFxuICB7IG5hbWU6ICdPbHltcGlhJyB9LFxuICB7IG5hbWU6ICdPbWFoYScgfSxcbiAgeyBuYW1lOiAnT250YXJpbycgfSxcbiAgeyBuYW1lOiAnT3JhbmdlJyB9LFxuICB7IG5hbWU6ICdPcmVtJyB9LFxuICB7IG5hbWU6ICdPcmxhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT3JsYW5kbycgfSxcbiAgeyBuYW1lOiAnT3Jtb25kIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdPcm8gVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdPc2hrb3NoJyB9LFxuICB7IG5hbWU6ICdPdmVybGFuZCBQYXJrJyB9LFxuICB7IG5hbWU6ICdPd2Vuc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ094bmFyZCcgfSxcbiAgeyBuYW1lOiAnUGFjaWZpY2EnIH0sXG4gIHsgbmFtZTogJ1BhbGF0aW5lJyB9LFxuICB7IG5hbWU6ICdQYWxtIEJheScgfSxcbiAgeyBuYW1lOiAnUGFsbSBCZWFjaCBHYXJkZW5zJyB9LFxuICB7IG5hbWU6ICdQYWxtIENvYXN0JyB9LFxuICB7IG5hbWU6ICdQYWxtIERlc2VydCcgfSxcbiAgeyBuYW1lOiAnUGFsbSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdQYWxtZGFsZScgfSxcbiAgeyBuYW1lOiAnUGFsbyBBbHRvJyB9LFxuICB7IG5hbWU6ICdQYW5hbWEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnUGFyYW1vdW50JyB9LFxuICB7IG5hbWU6ICdQYXJrIFJpZGdlJyB9LFxuICB7IG5hbWU6ICdQYXJrZXInIH0sXG4gIHsgbmFtZTogJ1Bhcm1hJyB9LFxuICB7IG5hbWU6ICdQYXNhZGVuYScgfSxcbiAgeyBuYW1lOiAnUGFzYWRlbmEnIH0sXG4gIHsgbmFtZTogJ1Bhc2NvJyB9LFxuICB7IG5hbWU6ICdQYXNzYWljJyB9LFxuICB7IG5hbWU6ICdQYXRlcnNvbicgfSxcbiAgeyBuYW1lOiAnUGF3dHVja2V0JyB9LFxuICB7IG5hbWU6ICdQZWFib2R5JyB9LFxuICB7IG5hbWU6ICdQZWFjaHRyZWUgQ29ybmVycycgfSxcbiAgeyBuYW1lOiAnUGVhcmxhbmQnIH0sXG4gIHsgbmFtZTogJ1BlbWJyb2tlIFBpbmVzJyB9LFxuICB7IG5hbWU6ICdQZW5zYWNvbGEnIH0sXG4gIHsgbmFtZTogJ1Blb3JpYScgfSxcbiAgeyBuYW1lOiAnUGVvcmlhJyB9LFxuICB7IG5hbWU6ICdQZXJyaXMnIH0sXG4gIHsgbmFtZTogJ1BlcnRoIEFtYm95JyB9LFxuICB7IG5hbWU6ICdQZXRhbHVtYScgfSxcbiAgeyBuYW1lOiAnUGZsdWdlcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdQaGFycicgfSxcbiAgeyBuYW1lOiAnUGhlbml4IENpdHknIH0sXG4gIHsgbmFtZTogJ1BoaWxhZGVscGhpYScgfSxcbiAgeyBuYW1lOiAnUGhvZW5peCcgfSxcbiAgeyBuYW1lOiAnUGljbyBSaXZlcmEnIH0sXG4gIHsgbmFtZTogJ1BpbmUgQmx1ZmYnIH0sXG4gIHsgbmFtZTogJ1BpbmVsbGFzIFBhcmsnIH0sXG4gIHsgbmFtZTogJ1BpdHRzYnVyZycgfSxcbiAgeyBuYW1lOiAnUGl0dHNidXJnaCcgfSxcbiAgeyBuYW1lOiAnUGl0dHNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnUGxhY2VudGlhJyB9LFxuICB7IG5hbWU6ICdQbGFpbmZpZWxkJyB9LFxuICB7IG5hbWU6ICdQbGFpbmZpZWxkJyB9LFxuICB7IG5hbWU6ICdQbGFubycgfSxcbiAgeyBuYW1lOiAnUGxhbnRhdGlvbicgfSxcbiAgeyBuYW1lOiAnUGxlYXNhbnRvbicgfSxcbiAgeyBuYW1lOiAnUGx5bW91dGgnIH0sXG4gIHsgbmFtZTogJ1BvY2F0ZWxsbycgfSxcbiAgeyBuYW1lOiAnUG9tb25hJyB9LFxuICB7IG5hbWU6ICdQb21wYW5vIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdQb250aWFjJyB9LFxuICB7IG5hbWU6ICdQb3J0IEFydGh1cicgfSxcbiAgeyBuYW1lOiAnUG9ydCBPcmFuZ2UnIH0sXG4gIHsgbmFtZTogJ1BvcnQgU3QuIEx1Y2llJyB9LFxuICB7IG5hbWU6ICdQb3J0YWdlJyB9LFxuICB7IG5hbWU6ICdQb3J0ZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnUG9ydGxhbmQnIH0sXG4gIHsgbmFtZTogJ1BvcnRsYW5kJyB9LFxuICB7IG5hbWU6ICdQb3J0c21vdXRoJyB9LFxuICB7IG5hbWU6ICdQb3dheScgfSxcbiAgeyBuYW1lOiAnUHJlc2NvdHQnIH0sXG4gIHsgbmFtZTogJ1ByZXNjb3R0IFZhbGxleScgfSxcbiAgeyBuYW1lOiAnUHJvdmlkZW5jZScgfSxcbiAgeyBuYW1lOiAnUHJvdm8nIH0sXG4gIHsgbmFtZTogJ1B1ZWJsbycgfSxcbiAgeyBuYW1lOiAnUHV5YWxsdXAnIH0sXG4gIHsgbmFtZTogJ1F1aW5jeScgfSxcbiAgeyBuYW1lOiAnUXVpbmN5JyB9LFxuICB7IG5hbWU6ICdSYWNpbmUnIH0sXG4gIHsgbmFtZTogJ1JhbGVpZ2gnIH0sXG4gIHsgbmFtZTogJ1JhbmNobyBDb3Jkb3ZhJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gQ3VjYW1vbmdhJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gUGFsb3MgVmVyZGVzJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gU2FudGEgTWFyZ2FyaXRhJyB9LFxuICB7IG5hbWU6ICdSYXBpZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdSZWFkaW5nJyB9LFxuICB7IG5hbWU6ICdSZWRkaW5nJyB9LFxuICB7IG5hbWU6ICdSZWRsYW5kcycgfSxcbiAgeyBuYW1lOiAnUmVkbW9uZCcgfSxcbiAgeyBuYW1lOiAnUmVkb25kbyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnUmVkd29vZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdSZW5vJyB9LFxuICB7IG5hbWU6ICdSZW50b24nIH0sXG4gIHsgbmFtZTogJ1JldmVyZScgfSxcbiAgeyBuYW1lOiAnUmlhbHRvJyB9LFxuICB7IG5hbWU6ICdSaWNoYXJkc29uJyB9LFxuICB7IG5hbWU6ICdSaWNobGFuZCcgfSxcbiAgeyBuYW1lOiAnUmljaG1vbmQnIH0sXG4gIHsgbmFtZTogJ1JpY2htb25kJyB9LFxuICB7IG5hbWU6ICdSaW8gUmFuY2hvJyB9LFxuICB7IG5hbWU6ICdSaXZlcnNpZGUnIH0sXG4gIHsgbmFtZTogJ1JpdmVydG9uJyB9LFxuICB7IG5hbWU6ICdSb2Fub2tlJyB9LFxuICB7IG5hbWU6ICdSb2NoZXN0ZXInIH0sXG4gIHsgbmFtZTogJ1JvY2hlc3RlcicgfSxcbiAgeyBuYW1lOiAnUm9jaGVzdGVyIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdSb2NrIEhpbGwnIH0sXG4gIHsgbmFtZTogJ1JvY2sgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdSb2NrZm9yZCcgfSxcbiAgeyBuYW1lOiAnUm9ja2xpbicgfSxcbiAgeyBuYW1lOiAnUm9ja3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb2Nrd2FsbCcgfSxcbiAgeyBuYW1lOiAnUm9ja3kgTW91bnQnIH0sXG4gIHsgbmFtZTogJ1JvZ2VycycgfSxcbiAgeyBuYW1lOiAnUm9obmVydCBQYXJrJyB9LFxuICB7IG5hbWU6ICdSb21lb3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3NlbWVhZCcgfSxcbiAgeyBuYW1lOiAnUm9zZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3NldmlsbGUnIH0sXG4gIHsgbmFtZTogJ1Jvc3dlbGwnIH0sXG4gIHsgbmFtZTogJ1Jvc3dlbGwnIH0sXG4gIHsgbmFtZTogJ1JvdW5kIFJvY2snIH0sXG4gIHsgbmFtZTogJ1Jvd2xldHQnIH0sXG4gIHsgbmFtZTogJ1JveScgfSxcbiAgeyBuYW1lOiAnUm95YWwgT2FrJyB9LFxuICB7IG5hbWU6ICdTYWNyYW1lbnRvJyB9LFxuICB7IG5hbWU6ICdTYWdpbmF3JyB9LFxuICB7IG5hbWU6ICdTYWxlbScgfSxcbiAgeyBuYW1lOiAnU2FsZW0nIH0sXG4gIHsgbmFtZTogJ1NhbGluYScgfSxcbiAgeyBuYW1lOiAnU2FsaW5hcycgfSxcbiAgeyBuYW1lOiAnU2FsdCBMYWtlIENpdHknIH0sXG4gIHsgbmFtZTogJ1NhbW1hbWlzaCcgfSxcbiAgeyBuYW1lOiAnU2FuIEFuZ2VsbycgfSxcbiAgeyBuYW1lOiAnU2FuIEFudG9uaW8nIH0sXG4gIHsgbmFtZTogJ1NhbiBCZXJuYXJkaW5vJyB9LFxuICB7IG5hbWU6ICdTYW4gQnJ1bm8nIH0sXG4gIHsgbmFtZTogJ1NhbiBCdWVuYXZlbnR1cmEgKFZlbnR1cmEpJyB9LFxuICB7IG5hbWU6ICdTYW4gQ2xlbWVudGUnIH0sXG4gIHsgbmFtZTogJ1NhbiBEaWVnbycgfSxcbiAgeyBuYW1lOiAnU2FuIEZyYW5jaXNjbycgfSxcbiAgeyBuYW1lOiAnU2FuIEdhYnJpZWwnIH0sXG4gIHsgbmFtZTogJ1NhbiBKYWNpbnRvJyB9LFxuICB7IG5hbWU6ICdTYW4gSm9zZScgfSxcbiAgeyBuYW1lOiAnU2FuIExlYW5kcm8nIH0sXG4gIHsgbmFtZTogJ1NhbiBMdWlzIE9iaXNwbycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hcmNvcycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hcmNvcycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hdGVvJyB9LFxuICB7IG5hbWU6ICdTYW4gUmFmYWVsJyB9LFxuICB7IG5hbWU6ICdTYW4gUmFtb24nIH0sXG4gIHsgbmFtZTogJ1NhbmR5JyB9LFxuICB7IG5hbWU6ICdTYW5keSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdTYW5mb3JkJyB9LFxuICB7IG5hbWU6ICdTYW50YSBBbmEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIEJhcmJhcmEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIENsYXJhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDbGFyaXRhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDcnV6JyB9LFxuICB7IG5hbWU6ICdTYW50YSBGZScgfSxcbiAgeyBuYW1lOiAnU2FudGEgTWFyaWEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIE1vbmljYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgUm9zYScgfSxcbiAgeyBuYW1lOiAnU2FudGVlJyB9LFxuICB7IG5hbWU6ICdTYXJhc290YScgfSxcbiAgeyBuYW1lOiAnU2F2YW5uYWgnIH0sXG4gIHsgbmFtZTogJ1NheXJldmlsbGUnIH0sXG4gIHsgbmFtZTogJ1NjaGF1bWJ1cmcnIH0sXG4gIHsgbmFtZTogJ1NjaGVuZWN0YWR5JyB9LFxuICB7IG5hbWU6ICdTY290dHNkYWxlJyB9LFxuICB7IG5hbWU6ICdTY3JhbnRvbicgfSxcbiAgeyBuYW1lOiAnU2VhdHRsZScgfSxcbiAgeyBuYW1lOiAnU2hha29wZWUnIH0sXG4gIHsgbmFtZTogJ1NoYXduZWUnIH0sXG4gIHsgbmFtZTogJ1NoZWJveWdhbicgfSxcbiAgeyBuYW1lOiAnU2hlbHRvbicgfSxcbiAgeyBuYW1lOiAnU2hlcm1hbicgfSxcbiAgeyBuYW1lOiAnU2hvcmVsaW5lJyB9LFxuICB7IG5hbWU6ICdTaHJldmVwb3J0JyB9LFxuICB7IG5hbWU6ICdTaWVycmEgVmlzdGEnIH0sXG4gIHsgbmFtZTogJ1NpbWkgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdTaW91eCBDaXR5JyB9LFxuICB7IG5hbWU6ICdTaW91eCBGYWxscycgfSxcbiAgeyBuYW1lOiAnU2tva2llJyB9LFxuICB7IG5hbWU6ICdTbXlybmEnIH0sXG4gIHsgbmFtZTogJ1NteXJuYScgfSxcbiAgeyBuYW1lOiAnU29tZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnU291dGggQmVuZCcgfSxcbiAgeyBuYW1lOiAnU291dGggR2F0ZScgfSxcbiAgeyBuYW1lOiAnU291dGggSm9yZGFuJyB9LFxuICB7IG5hbWU6ICdTb3V0aCBTYW4gRnJhbmNpc2NvJyB9LFxuICB7IG5hbWU6ICdTb3V0aGF2ZW4nIH0sXG4gIHsgbmFtZTogJ1NvdXRoZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwYW5pc2ggRm9yaycgfSxcbiAgeyBuYW1lOiAnU3BhcmtzJyB9LFxuICB7IG5hbWU6ICdTcGFydGFuYnVyZycgfSxcbiAgeyBuYW1lOiAnU3Bva2FuZScgfSxcbiAgeyBuYW1lOiAnU3Bva2FuZSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2RhbGUnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3QuIENoYXJsZXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbGFpciBTaG9yZXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbG91ZCcgfSxcbiAgeyBuYW1lOiAnU3QuIENsb3VkJyB9LFxuICB7IG5hbWU6ICdTdC4gR2VvcmdlJyB9LFxuICB7IG5hbWU6ICdTdC4gSm9zZXBoJyB9LFxuICB7IG5hbWU6ICdTdC4gTG91aXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBMb3VpcyBQYXJrJyB9LFxuICB7IG5hbWU6ICdTdC4gUGF1bCcgfSxcbiAgeyBuYW1lOiAnU3QuIFBldGVycycgfSxcbiAgeyBuYW1lOiAnU3QuIFBldGVyc2J1cmcnIH0sXG4gIHsgbmFtZTogJ1N0YW1mb3JkJyB9LFxuICB7IG5hbWU6ICdTdGFudG9uJyB9LFxuICB7IG5hbWU6ICdTdGF0ZSBDb2xsZWdlJyB9LFxuICB7IG5hbWU6ICdTdGVybGluZyBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdTdGlsbHdhdGVyJyB9LFxuICB7IG5hbWU6ICdTdG9ja3RvbicgfSxcbiAgeyBuYW1lOiAnU3RyZWFtd29vZCcgfSxcbiAgeyBuYW1lOiAnU3Ryb25nc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdTdWZmb2xrJyB9LFxuICB7IG5hbWU6ICdTdWdhciBMYW5kJyB9LFxuICB7IG5hbWU6ICdTdW1tZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnU3VtdGVyJyB9LFxuICB7IG5hbWU6ICdTdW5ueXZhbGUnIH0sXG4gIHsgbmFtZTogJ1N1bnJpc2UnIH0sXG4gIHsgbmFtZTogJ1N1cnByaXNlJyB9LFxuICB7IG5hbWU6ICdTeXJhY3VzZScgfSxcbiAgeyBuYW1lOiAnVGFjb21hJyB9LFxuICB7IG5hbWU6ICdUYWxsYWhhc3NlZScgfSxcbiAgeyBuYW1lOiAnVGFtYXJhYycgfSxcbiAgeyBuYW1lOiAnVGFtcGEnIH0sXG4gIHsgbmFtZTogJ1RhdW50b24nIH0sXG4gIHsgbmFtZTogJ1RheWxvcicgfSxcbiAgeyBuYW1lOiAnVGF5bG9yc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdUZW1lY3VsYScgfSxcbiAgeyBuYW1lOiAnVGVtcGUnIH0sXG4gIHsgbmFtZTogJ1RlbXBsZScgfSxcbiAgeyBuYW1lOiAnVGVycmUgSGF1dGUnIH0sXG4gIHsgbmFtZTogJ1RleGFya2FuYScgfSxcbiAgeyBuYW1lOiAnVGV4YXMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnVGhlIENvbG9ueScgfSxcbiAgeyBuYW1lOiAnVGhvcm50b24nIH0sXG4gIHsgbmFtZTogJ1Rob3VzYW5kIE9ha3MnIH0sXG4gIHsgbmFtZTogJ1RpZ2FyZCcgfSxcbiAgeyBuYW1lOiAnVGlubGV5IFBhcmsnIH0sXG4gIHsgbmFtZTogJ1RpdHVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1RvbGVkbycgfSxcbiAgeyBuYW1lOiAnVG9wZWthJyB9LFxuICB7IG5hbWU6ICdUb3JyYW5jZScgfSxcbiAgeyBuYW1lOiAnVHJhY3knIH0sXG4gIHsgbmFtZTogJ1RyZW50b24nIH0sXG4gIHsgbmFtZTogJ1Ryb3knIH0sXG4gIHsgbmFtZTogJ1Ryb3knIH0sXG4gIHsgbmFtZTogJ1R1Y3NvbicgfSxcbiAgeyBuYW1lOiAnVHVsYXJlJyB9LFxuICB7IG5hbWU6ICdUdWxzYScgfSxcbiAgeyBuYW1lOiAnVHVybG9jaycgfSxcbiAgeyBuYW1lOiAnVHVzY2Fsb29zYScgfSxcbiAgeyBuYW1lOiAnVHVzdGluJyB9LFxuICB7IG5hbWU6ICdUd2luIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdUeWxlcicgfSxcbiAgeyBuYW1lOiAnVW5pb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnVW5pb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnVXBsYW5kJyB9LFxuICB7IG5hbWU6ICdVcmJhbmEnIH0sXG4gIHsgbmFtZTogJ1VyYmFuZGFsZScgfSxcbiAgeyBuYW1lOiAnVXRpY2EnIH0sXG4gIHsgbmFtZTogJ1ZhY2F2aWxsZScgfSxcbiAgeyBuYW1lOiAnVmFsZG9zdGEnIH0sXG4gIHsgbmFtZTogJ1ZhbGxlam8nIH0sXG4gIHsgbmFtZTogJ1ZhbGxleSBTdHJlYW0nIH0sXG4gIHsgbmFtZTogJ1ZhbmNvdXZlcicgfSxcbiAgeyBuYW1lOiAnVmljdG9yaWEnIH0sXG4gIHsgbmFtZTogJ1ZpY3RvcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdWaW5lbGFuZCcgfSxcbiAgeyBuYW1lOiAnVmlyZ2luaWEgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1Zpc2FsaWEnIH0sXG4gIHsgbmFtZTogJ1Zpc3RhJyB9LFxuICB7IG5hbWU6ICdXYWNvJyB9LFxuICB7IG5hbWU6ICdXYWxudXQgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ1dhbHRoYW0nIH0sXG4gIHsgbmFtZTogJ1dhcm5lciBSb2JpbnMnIH0sXG4gIHsgbmFtZTogJ1dhcnJlbicgfSxcbiAgeyBuYW1lOiAnV2FycmVuJyB9LFxuICB7IG5hbWU6ICdXYXJ3aWNrJyB9LFxuICB7IG5hbWU6ICdXYXNoaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXYXRlcmJ1cnknIH0sXG4gIHsgbmFtZTogJ1dhdGVybG9vJyB9LFxuICB7IG5hbWU6ICdXYXRzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnV2F1a2VnYW4nIH0sXG4gIHsgbmFtZTogJ1dhdWtlc2hhJyB9LFxuICB7IG5hbWU6ICdXYXVzYXUnIH0sXG4gIHsgbmFtZTogJ1dhdXdhdG9zYScgfSxcbiAgeyBuYW1lOiAnV2VsbGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnV2VzbGFjbycgfSxcbiAgeyBuYW1lOiAnV2VzdCBBbGxpcycgfSxcbiAgeyBuYW1lOiAnV2VzdCBDb3ZpbmEnIH0sXG4gIHsgbmFtZTogJ1dlc3QgRGVzIE1vaW5lcycgfSxcbiAgeyBuYW1lOiAnV2VzdCBIYXZlbicgfSxcbiAgeyBuYW1lOiAnV2VzdCBKb3JkYW4nIH0sXG4gIHsgbmFtZTogJ1dlc3QgTmV3IFlvcmsnIH0sXG4gIHsgbmFtZTogJ1dlc3QgUGFsbSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnV2VzdCBTYWNyYW1lbnRvJyB9LFxuICB7IG5hbWU6ICdXZXN0IFZhbGxleSBDaXR5JyB9LFxuICB7IG5hbWU6ICdXZXN0ZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnV2VzdGZpZWxkJyB9LFxuICB7IG5hbWU6ICdXZXN0bGFuZCcgfSxcbiAgeyBuYW1lOiAnV2VzdG1pbnN0ZXInIH0sXG4gIHsgbmFtZTogJ1dlc3RtaW5zdGVyJyB9LFxuICB7IG5hbWU6ICdXZXN0b24nIH0sXG4gIHsgbmFtZTogJ1dleW1vdXRoIFRvd24nIH0sXG4gIHsgbmFtZTogJ1doZWF0b24nIH0sXG4gIHsgbmFtZTogJ1doZWVsaW5nJyB9LFxuICB7IG5hbWU6ICdXaGl0ZSBQbGFpbnMnIH0sXG4gIHsgbmFtZTogJ1doaXR0aWVyJyB9LFxuICB7IG5hbWU6ICdXaWNoaXRhJyB9LFxuICB7IG5hbWU6ICdXaWNoaXRhIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdXaWxrZXMtQmFycmUnIH0sXG4gIHsgbmFtZTogJ1dpbG1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dpbG1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dpbHNvbicgfSxcbiAgeyBuYW1lOiAnV2luc3Rvbi1TYWxlbScgfSxcbiAgeyBuYW1lOiAnV2ludGVyIEdhcmRlbicgfSxcbiAgeyBuYW1lOiAnV29idXJuJyB9LFxuICB7IG5hbWU6ICdXb29kYnVyeScgfSxcbiAgeyBuYW1lOiAnV29vZGxhbmQnIH0sXG4gIHsgbmFtZTogJ1dvb25zb2NrZXQnIH0sXG4gIHsgbmFtZTogJ1dvcmNlc3RlcicgfSxcbiAgeyBuYW1lOiAnV3lsaWUnIH0sXG4gIHsgbmFtZTogJ1d5b21pbmcnIH0sXG4gIHsgbmFtZTogJ1lha2ltYScgfSxcbiAgeyBuYW1lOiAnWW9ua2VycycgfSxcbiAgeyBuYW1lOiAnWW9yYmEgTGluZGEnIH0sXG4gIHsgbmFtZTogJ1lvcmsnIH0sXG4gIHsgbmFtZTogJ1lvdW5nc3Rvd24nIH0sXG4gIHsgbmFtZTogJ1l1YmEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnWXVjYWlwYScgfSxcbiAgeyBuYW1lOiAnWXVtYScgfVxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuXHR7IGdpdGh1YjogJ2plZHdhdHNvbicsIG5hbWU6ICdKZWQgV2F0c29uJyB9LFxuXHR7IGdpdGh1YjogJ2JydWRlcnN0ZWluJywgbmFtZTogJ0RhdmUgQnJvdGhlcnN0b25lJyB9LFxuXHR7IGdpdGh1YjogJ2pvc3NtYWMnLCBuYW1lOiAnSm9zcyBNYWNraXNvbicgfSxcblx0eyBnaXRodWI6ICdqbmllY2hjaWFsJywgbmFtZTogJ0pha3ViIE5pZWNoY2lhxYInIH0sXG5cdHsgZ2l0aHViOiAnY3JhaWdkYWxsaW1vcmUnLCBuYW1lOiAnQ3JhaWcgRGFsbGltb3JlJyB9LFxuXHR7IGdpdGh1YjogJ2p1bGVuJywgbmFtZTogJ0p1bGVuIFJ1aXogQWl6cHVydScgfSxcblx0eyBnaXRodWI6ICdkY291c2VucycsIG5hbWU6ICdEYW5pZWwgQ291c2VucycgfSxcblx0eyBnaXRodWI6ICdqZ2F1dHNjaCcsIG5hbWU6ICdKb24gR2F1dHNjaCcgfSxcblx0eyBnaXRodWI6ICdkbWl0cnktc21pcm5vdicsIG5hbWU6ICdEbWl0cnkgU21pcm5vdicgfSxcbl07XG4iLCJleHBvcnRzLkFVID0gW1xuXHR7IHZhbHVlOiAnYXVzdHJhbGlhbi1jYXBpdGFsLXRlcnJpdG9yeScsIGxhYmVsOiAnQXVzdHJhbGlhbiBDYXBpdGFsIFRlcnJpdG9yeScsIGNsYXNzTmFtZTogJ1N0YXRlLUFDVCcgfSxcblx0eyB2YWx1ZTogJ25ldy1zb3V0aC13YWxlcycsIGxhYmVsOiAnTmV3IFNvdXRoIFdhbGVzJywgY2xhc3NOYW1lOiAnU3RhdGUtTlNXJyB9LFxuXHR7IHZhbHVlOiAndmljdG9yaWEnLCBsYWJlbDogJ1ZpY3RvcmlhJywgY2xhc3NOYW1lOiAnU3RhdGUtVmljJyB9LFxuXHR7IHZhbHVlOiAncXVlZW5zbGFuZCcsIGxhYmVsOiAnUXVlZW5zbGFuZCcsIGNsYXNzTmFtZTogJ1N0YXRlLVFsZCcgfSxcblx0eyB2YWx1ZTogJ3dlc3Rlcm4tYXVzdHJhbGlhJywgbGFiZWw6ICdXZXN0ZXJuIEF1c3RyYWxpYScsIGNsYXNzTmFtZTogJ1N0YXRlLVdBJyB9LFxuXHR7IHZhbHVlOiAnc291dGgtYXVzdHJhbGlhJywgbGFiZWw6ICdTb3V0aCBBdXN0cmFsaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1TQScgfSxcblx0eyB2YWx1ZTogJ3Rhc21hbmlhJywgbGFiZWw6ICdUYXNtYW5pYScsIGNsYXNzTmFtZTogJ1N0YXRlLVRhcycgfSxcblx0eyB2YWx1ZTogJ25vcnRoZXJuLXRlcnJpdG9yeScsIGxhYmVsOiAnTm9ydGhlcm4gVGVycml0b3J5JywgY2xhc3NOYW1lOiAnU3RhdGUtTlQnIH0sXG5dO1xuXG5leHBvcnRzLlVTID0gW1xuICAgIHsgdmFsdWU6ICdBTCcsIGxhYmVsOiAnQWxhYmFtYScsIGRpc2FibGVkOiB0cnVlIH0sXG4gICAgeyB2YWx1ZTogJ0FLJywgbGFiZWw6ICdBbGFza2EnIH0sXG4gICAgeyB2YWx1ZTogJ0FTJywgbGFiZWw6ICdBbWVyaWNhbiBTYW1vYScgfSxcbiAgICB7IHZhbHVlOiAnQVonLCBsYWJlbDogJ0FyaXpvbmEnIH0sXG4gICAgeyB2YWx1ZTogJ0FSJywgbGFiZWw6ICdBcmthbnNhcycgfSxcbiAgICB7IHZhbHVlOiAnQ0EnLCBsYWJlbDogJ0NhbGlmb3JuaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0NPJywgbGFiZWw6ICdDb2xvcmFkbycgfSxcbiAgICB7IHZhbHVlOiAnQ1QnLCBsYWJlbDogJ0Nvbm5lY3RpY3V0JyB9LFxuICAgIHsgdmFsdWU6ICdERScsIGxhYmVsOiAnRGVsYXdhcmUnIH0sXG4gICAgeyB2YWx1ZTogJ0RDJywgbGFiZWw6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScgfSxcbiAgICB7IHZhbHVlOiAnRk0nLCBsYWJlbDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScgfSxcbiAgICB7IHZhbHVlOiAnRkwnLCBsYWJlbDogJ0Zsb3JpZGEnIH0sXG4gICAgeyB2YWx1ZTogJ0dBJywgbGFiZWw6ICdHZW9yZ2lhJyB9LFxuICAgIHsgdmFsdWU6ICdHVScsIGxhYmVsOiAnR3VhbScgfSxcbiAgICB7IHZhbHVlOiAnSEknLCBsYWJlbDogJ0hhd2FpaScgfSxcbiAgICB7IHZhbHVlOiAnSUQnLCBsYWJlbDogJ0lkYWhvJyB9LFxuICAgIHsgdmFsdWU6ICdJTCcsIGxhYmVsOiAnSWxsaW5vaXMnIH0sXG4gICAgeyB2YWx1ZTogJ0lOJywgbGFiZWw6ICdJbmRpYW5hJyB9LFxuICAgIHsgdmFsdWU6ICdJQScsIGxhYmVsOiAnSW93YScgfSxcbiAgICB7IHZhbHVlOiAnS1MnLCBsYWJlbDogJ0thbnNhcycgfSxcbiAgICB7IHZhbHVlOiAnS1knLCBsYWJlbDogJ0tlbnR1Y2t5JyB9LFxuICAgIHsgdmFsdWU6ICdMQScsIGxhYmVsOiAnTG91aXNpYW5hJyB9LFxuICAgIHsgdmFsdWU6ICdNRScsIGxhYmVsOiAnTWFpbmUnIH0sXG4gICAgeyB2YWx1ZTogJ01IJywgbGFiZWw6ICdNYXJzaGFsbCBJc2xhbmRzJyB9LFxuICAgIHsgdmFsdWU6ICdNRCcsIGxhYmVsOiAnTWFyeWxhbmQnIH0sXG4gICAgeyB2YWx1ZTogJ01BJywgbGFiZWw6ICdNYXNzYWNodXNldHRzJyB9LFxuICAgIHsgdmFsdWU6ICdNSScsIGxhYmVsOiAnTWljaGlnYW4nIH0sXG4gICAgeyB2YWx1ZTogJ01OJywgbGFiZWw6ICdNaW5uZXNvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ01TJywgbGFiZWw6ICdNaXNzaXNzaXBwaScgfSxcbiAgICB7IHZhbHVlOiAnTU8nLCBsYWJlbDogJ01pc3NvdXJpJyB9LFxuICAgIHsgdmFsdWU6ICdNVCcsIGxhYmVsOiAnTW9udGFuYScgfSxcbiAgICB7IHZhbHVlOiAnTkUnLCBsYWJlbDogJ05lYnJhc2thJyB9LFxuICAgIHsgdmFsdWU6ICdOVicsIGxhYmVsOiAnTmV2YWRhJyB9LFxuICAgIHsgdmFsdWU6ICdOSCcsIGxhYmVsOiAnTmV3IEhhbXBzaGlyZScgfSxcbiAgICB7IHZhbHVlOiAnTkonLCBsYWJlbDogJ05ldyBKZXJzZXknIH0sXG4gICAgeyB2YWx1ZTogJ05NJywgbGFiZWw6ICdOZXcgTWV4aWNvJyB9LFxuICAgIHsgdmFsdWU6ICdOWScsIGxhYmVsOiAnTmV3IFlvcmsnIH0sXG4gICAgeyB2YWx1ZTogJ05DJywgbGFiZWw6ICdOb3J0aCBDYXJvbGluYScgfSxcbiAgICB7IHZhbHVlOiAnTkQnLCBsYWJlbDogJ05vcnRoIERha290YScgfSxcbiAgICB7IHZhbHVlOiAnTVAnLCBsYWJlbDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnT0gnLCBsYWJlbDogJ09oaW8nIH0sXG4gICAgeyB2YWx1ZTogJ09LJywgbGFiZWw6ICdPa2xhaG9tYScgfSxcbiAgICB7IHZhbHVlOiAnT1InLCBsYWJlbDogJ09yZWdvbicgfSxcbiAgICB7IHZhbHVlOiAnUFcnLCBsYWJlbDogJ1BhbGF1JyB9LFxuICAgIHsgdmFsdWU6ICdQQScsIGxhYmVsOiAnUGVubnN5bHZhbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdQUicsIGxhYmVsOiAnUHVlcnRvIFJpY28nIH0sXG4gICAgeyB2YWx1ZTogJ1JJJywgbGFiZWw6ICdSaG9kZSBJc2xhbmQnIH0sXG4gICAgeyB2YWx1ZTogJ1NDJywgbGFiZWw6ICdTb3V0aCBDYXJvbGluYScgfSxcbiAgICB7IHZhbHVlOiAnU0QnLCBsYWJlbDogJ1NvdXRoIERha290YScgfSxcbiAgICB7IHZhbHVlOiAnVE4nLCBsYWJlbDogJ1Rlbm5lc3NlZScgfSxcbiAgICB7IHZhbHVlOiAnVFgnLCBsYWJlbDogJ1RleGFzJyB9LFxuICAgIHsgdmFsdWU6ICdVVCcsIGxhYmVsOiAnVXRhaCcgfSxcbiAgICB7IHZhbHVlOiAnVlQnLCBsYWJlbDogJ1Zlcm1vbnQnIH0sXG4gICAgeyB2YWx1ZTogJ1ZJJywgbGFiZWw6ICdWaXJnaW4gSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnVkEnLCBsYWJlbDogJ1ZpcmdpbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdXQScsIGxhYmVsOiAnV2FzaGluZ3RvbicgfSxcbiAgICB7IHZhbHVlOiAnV1YnLCBsYWJlbDogJ1dlc3QgVmlyZ2luaWEnIH0sXG4gICAgeyB2YWx1ZTogJ1dJJywgbGFiZWw6ICdXaXNjb25zaW4nIH0sXG4gICAgeyB2YWx1ZTogJ1dZJywgbGFiZWw6ICdXeW9taW5nJyB9LFxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuXHR7IHZhbHVlOiAnSm9obiBTbWl0aCcsIGxhYmVsOiAnSm9obiBTbWl0aCcsIGVtYWlsOiAnam9obkBzbWl0aC5jb20nIH0sXG5cdHsgdmFsdWU6ICdNZXJyeSBKYW5lJywgbGFiZWw6ICdNZXJyeSBKYW5lJywgZW1haWw6ICdtZXJyeUBqYW5lLmNvbScgfSxcblx0eyB2YWx1ZTogJ1N0YW4gSG9wZXInLCBsYWJlbDogJ1N0YW4gSG9wZXInLCBlbWFpbDogJ3N0YW5AaG9wZXIuY29tJyB9XG5dO1xuIiwidmFyIGNoYXJlbmMgPSB7XG4gIC8vIFVURi04IGVuY29kaW5nXG4gIHV0Zjg6IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIGNoYXJlbmMuYmluLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoY2hhcmVuYy5iaW4uYnl0ZXNUb1N0cmluZyhieXRlcykpKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQmluYXJ5IGVuY29kaW5nXG4gIGJpbjoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKylcbiAgICAgICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBzdHIgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgc3RyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkpO1xuICAgICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmVuYztcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGJhc2U2NG1hcFxuICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycsXG5cbiAgY3J5cHQgPSB7XG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gbGVmdFxuICAgIHJvdGw6IGZ1bmN0aW9uKG4sIGIpIHtcbiAgICAgIHJldHVybiAobiA8PCBiKSB8IChuID4+PiAoMzIgLSBiKSk7XG4gICAgfSxcblxuICAgIC8vIEJpdC13aXNlIHJvdGF0aW9uIHJpZ2h0XG4gICAgcm90cjogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8ICgzMiAtIGIpKSB8IChuID4+PiBiKTtcbiAgICB9LFxuXG4gICAgLy8gU3dhcCBiaWctZW5kaWFuIHRvIGxpdHRsZS1lbmRpYW4gYW5kIHZpY2UgdmVyc2FcbiAgICBlbmRpYW46IGZ1bmN0aW9uKG4pIHtcbiAgICAgIC8vIElmIG51bWJlciBnaXZlbiwgc3dhcCBlbmRpYW5cbiAgICAgIGlmIChuLmNvbnN0cnVjdG9yID09IE51bWJlcikge1xuICAgICAgICByZXR1cm4gY3J5cHQucm90bChuLCA4KSAmIDB4MDBGRjAwRkYgfCBjcnlwdC5yb3RsKG4sIDI0KSAmIDB4RkYwMEZGMDA7XG4gICAgICB9XG5cbiAgICAgIC8vIEVsc2UsIGFzc3VtZSBhcnJheSBhbmQgc3dhcCBhbGwgaXRlbXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7IGkrKylcbiAgICAgICAgbltpXSA9IGNyeXB0LmVuZGlhbihuW2ldKTtcbiAgICAgIHJldHVybiBuO1xuICAgIH0sXG5cbiAgICAvLyBHZW5lcmF0ZSBhbiBhcnJheSBvZiBhbnkgbGVuZ3RoIG9mIHJhbmRvbSBieXRlc1xuICAgIHJhbmRvbUJ5dGVzOiBmdW5jdGlvbihuKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdOyBuID4gMDsgbi0tKVxuICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBiaWctZW5kaWFuIDMyLWJpdCB3b3Jkc1xuICAgIGJ5dGVzVG9Xb3JkczogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHdvcmRzID0gW10sIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpXG4gICAgICAgIHdvcmRzW2IgPj4+IDVdIHw9IGJ5dGVzW2ldIDw8ICgyNCAtIGIgJSAzMik7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYmlnLWVuZGlhbiAzMi1iaXQgd29yZHMgdG8gYSBieXRlIGFycmF5XG4gICAgd29yZHNUb0J5dGVzOiBmdW5jdGlvbih3b3Jkcykge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KVxuICAgICAgICBieXRlcy5wdXNoKCh3b3Jkc1tiID4+PiA1XSA+Pj4gKDI0IC0gYiAlIDMyKSkgJiAweEZGKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBoZXggc3RyaW5nXG4gICAgYnl0ZXNUb0hleDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGhleCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhleC5wdXNoKChieXRlc1tpXSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldICYgMHhGKS50b1N0cmluZygxNikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGhleCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgaGV4VG9CeXRlczogZnVuY3Rpb24oaGV4KSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBjID0gMDsgYyA8IGhleC5sZW5ndGg7IGMgKz0gMilcbiAgICAgICAgYnl0ZXMucHVzaChwYXJzZUludChoZXguc3Vic3RyKGMsIDIpLCAxNikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGJhc2UtNjQgc3RyaW5nXG4gICAgYnl0ZXNUb0Jhc2U2NDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGJhc2U2NCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGVzW2ldIDw8IDE2KSB8IChieXRlc1tpICsgMV0gPDwgOCkgfCBieXRlc1tpICsgMl07XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKVxuICAgICAgICAgIGlmIChpICogOCArIGogKiA2IDw9IGJ5dGVzLmxlbmd0aCAqIDgpXG4gICAgICAgICAgICBiYXNlNjQucHVzaChiYXNlNjRtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiA2ICogKDMgLSBqKSkgJiAweDNGKSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgYmFzZTY0LnB1c2goJz0nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYXNlNjQuam9pbignJyk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBiYXNlLTY0IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBiYXNlNjRUb0J5dGVzOiBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICAgIC8vIFJlbW92ZSBub24tYmFzZS02NCBjaGFyYWN0ZXJzXG4gICAgICBiYXNlNjQgPSBiYXNlNjQucmVwbGFjZSgvW15BLVowLTkrXFwvXS9pZywgJycpO1xuXG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMCwgaW1vZDQgPSAwOyBpIDwgYmFzZTY0Lmxlbmd0aDtcbiAgICAgICAgICBpbW9kNCA9ICsraSAlIDQpIHtcbiAgICAgICAgaWYgKGltb2Q0ID09IDApIGNvbnRpbnVlO1xuICAgICAgICBieXRlcy5wdXNoKCgoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpIC0gMSkpXG4gICAgICAgICAgICAmIChNYXRoLnBvdygyLCAtMiAqIGltb2Q0ICsgOCkgLSAxKSkgPDwgKGltb2Q0ICogMikpXG4gICAgICAgICAgICB8IChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkpKSA+Pj4gKDYgLSBpbW9kNCAqIDIpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gY3J5cHQ7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJy4vaW5ET00nKTtcblxudmFyIHNpemU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJlY2FsYykge1xuICBpZiAoIXNpemUgfHwgcmVjYWxjKSB7XG4gICAgaWYgKGNhblVzZURPTSkge1xuICAgICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBzY3JvbGxEaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnRvcCA9ICctOTk5OXB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS53aWR0aCA9ICc1MHB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgc2l6ZSA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2l6ZTtcbn07IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHNoYWxsb3dFcXVhbFxuICogQHR5cGVjaGVja3NcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBQZXJmb3JtcyBlcXVhbGl0eSBieSBpdGVyYXRpbmcgdGhyb3VnaCBrZXlzIG9uIGFuIG9iamVjdCBhbmQgcmV0dXJuaW5nIGZhbHNlXG4gKiB3aGVuIGFueSBrZXkgaGFzIHZhbHVlcyB3aGljaCBhcmUgbm90IHN0cmljdGx5IGVxdWFsIGJldHdlZW4gdGhlIGFyZ3VtZW50cy5cbiAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSB2YWx1ZXMgb2YgYWxsIGtleXMgYXJlIHN0cmljdGx5IGVxdWFsLlxuICovXG5mdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQikge1xuICBpZiAob2JqQSA9PT0gb2JqQikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRlc3QgZm9yIEEncyBrZXlzIGRpZmZlcmVudCBmcm9tIEIuXG4gIHZhciBiSGFzT3duUHJvcGVydHkgPSBoYXNPd25Qcm9wZXJ0eS5iaW5kKG9iakIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFiSGFzT3duUHJvcGVydHkoa2V5c0FbaV0pIHx8IG9iakFba2V5c0FbaV1dICE9PSBvYmpCW2tleXNBW2ldXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dFcXVhbDsiLCIvKipcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgQnVmZmVyXG4gKlxuICogQXV0aG9yOiAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIGlzLWJ1ZmZlcmBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuICEhKG9iaiAhPSBudWxsICYmXG4gICAgKG9iai5faXNCdWZmZXIgfHwgLy8gRm9yIFNhZmFyaSA1LTcgKG1pc3NpbmcgT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvcilcbiAgICAgIChvYmouY29uc3RydWN0b3IgJiZcbiAgICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKVxuICAgICkpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWVkaWFRdWVyeTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgbWVkaWFRdWVyeSA9IFwiKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMS4yNSksIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMjUpLCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogNS80KSwgKG1pbi1yZXNvbHV0aW9uOiAxLjI1ZHBweClcIjtcbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxLjI1KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKG1lZGlhUXVlcnkpLm1hdGNoZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGNyeXB0ID0gcmVxdWlyZSgnY3J5cHQnKSxcclxuICAgICAgdXRmOCA9IHJlcXVpcmUoJ2NoYXJlbmMnKS51dGY4LFxyXG4gICAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpLFxyXG4gICAgICBiaW4gPSByZXF1aXJlKCdjaGFyZW5jJykuYmluLFxyXG5cclxuICAvLyBUaGUgY29yZVxyXG4gIG1kNSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAvLyBDb252ZXJ0IHRvIGJ5dGUgYXJyYXlcclxuICAgIGlmIChtZXNzYWdlLmNvbnN0cnVjdG9yID09IFN0cmluZylcclxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGluZyA9PT0gJ2JpbmFyeScpXHJcbiAgICAgICAgbWVzc2FnZSA9IGJpbi5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgbWVzc2FnZSA9IHV0Zjguc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgIGVsc2UgaWYgKGlzQnVmZmVyKG1lc3NhZ2UpKVxyXG4gICAgICBtZXNzYWdlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZSwgMCk7XHJcbiAgICBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcclxuICAgIC8vIGVsc2UsIGFzc3VtZSBieXRlIGFycmF5IGFscmVhZHlcclxuXHJcbiAgICB2YXIgbSA9IGNyeXB0LmJ5dGVzVG9Xb3JkcyhtZXNzYWdlKSxcclxuICAgICAgICBsID0gbWVzc2FnZS5sZW5ndGggKiA4LFxyXG4gICAgICAgIGEgPSAgMTczMjU4NDE5MyxcclxuICAgICAgICBiID0gLTI3MTczMzg3OSxcclxuICAgICAgICBjID0gLTE3MzI1ODQxOTQsXHJcbiAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gICAgLy8gU3dhcCBlbmRpYW5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtW2ldID0gKChtW2ldIDw8ICA4KSB8IChtW2ldID4+PiAyNCkpICYgMHgwMEZGMDBGRiB8XHJcbiAgICAgICAgICAgICAoKG1baV0gPDwgMjQpIHwgKG1baV0gPj4+ICA4KSkgJiAweEZGMDBGRjAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBhZGRpbmdcclxuICAgIG1bbCA+Pj4gNV0gfD0gMHg4MCA8PCAobCAlIDMyKTtcclxuICAgIG1bKCgobCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsO1xyXG5cclxuICAgIC8vIE1ldGhvZCBzaG9ydGN1dHNcclxuICAgIHZhciBGRiA9IG1kNS5fZmYsXHJcbiAgICAgICAgR0cgPSBtZDUuX2dnLFxyXG4gICAgICAgIEhIID0gbWQ1Ll9oaCxcclxuICAgICAgICBJSSA9IG1kNS5faWk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSArPSAxNikge1xyXG5cclxuICAgICAgdmFyIGFhID0gYSxcclxuICAgICAgICAgIGJiID0gYixcclxuICAgICAgICAgIGNjID0gYyxcclxuICAgICAgICAgIGRkID0gZDtcclxuXHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDBdLCAgNywgLTY4MDg3NjkzNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDJdLCAxNywgIDYwNjEwNTgxOSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyA0XSwgIDcsIC0xNzY0MTg4OTcpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA1XSwgMTIsICAxMjAwMDgwNDI2KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgOF0sICA3LCAgMTc3MDAzNTQxNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKzEyXSwgIDcsICAxODA0NjAzNjgyKTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyAxXSwgIDUsIC0xNjU3OTY1MTApO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyA2XSwgIDksIC0xMDY5NTAxNjMyKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgNV0sICA1LCAtNzAxNTU4NjkxKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxMF0sICA5LCAgMzgwMTYwODMpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyA5XSwgIDUsICA1Njg0NDY0MzgpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKzE0XSwgIDksIC0xMDE5ODAzNjkwKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsgM10sIDE0LCAtMTg3MzYzOTYxKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyAyXSwgIDksIC01MTQwMzc4NCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDVdLCAgNCwgLTM3ODU1OCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsxNF0sIDIzLCAtMzUzMDk1NTYpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krIDddLCAxNiwgLTE1NTQ5NzYzMik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKzEzXSwgIDQsICA2ODEyNzkxNzQpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krIDJdLCAyMywgLTk5NTMzODY1MSk7XHJcblxyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDYsIC0xOTg2MzA4NDQpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKzEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgNF0sICA2LCAtMTQ1NTIzMDcwKTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDJdLCAxNSwgIDcxODc4NzI1OSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgICBhID0gKGEgKyBhYSkgPj4+IDA7XHJcbiAgICAgIGIgPSAoYiArIGJiKSA+Pj4gMDtcclxuICAgICAgYyA9IChjICsgY2MpID4+PiAwO1xyXG4gICAgICBkID0gKGQgKyBkZCkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNyeXB0LmVuZGlhbihbYSwgYiwgYywgZF0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEF1eGlsaWFyeSBmdW5jdGlvbnNcclxuICBtZDUuX2ZmICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGMgfCB+YiAmIGQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2dnICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGQgfCBjICYgfmQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2hoICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9paSAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG5cclxuICAvLyBQYWNrYWdlIHByaXZhdGUgYmxvY2tzaXplXHJcbiAgbWQ1Ll9ibG9ja3NpemUgPSAxNjtcclxuICBtZDUuX2RpZ2VzdHNpemUgPSAxNjtcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgaWYodHlwZW9mIG1lc3NhZ2UgPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgZGlnZXN0Ynl0ZXMgPSBjcnlwdC53b3Jkc1RvQnl0ZXMobWQ1KG1lc3NhZ2UsIG9wdGlvbnMpKTtcclxuICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcclxuICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBiaW4uYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxyXG4gICAgICAgIGNyeXB0LmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpO1xyXG4gIH07XHJcblxyXG59KSgpO1xyXG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnZXROYW5vU2Vjb25kcywgaHJ0aW1lLCBsb2FkVGltZTtcblxuICBpZiAoKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCkgJiYgcGVyZm9ybWFuY2Uubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsKSAmJiBwcm9jZXNzLmhydGltZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGdldE5hbm9TZWNvbmRzKCkgLSBsb2FkVGltZSkgLyAxZTY7XG4gICAgfTtcbiAgICBocnRpbWUgPSBwcm9jZXNzLmhydGltZTtcbiAgICBnZXROYW5vU2Vjb25kcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhyO1xuICAgICAgaHIgPSBocnRpbWUoKTtcbiAgICAgIHJldHVybiBoclswXSAqIDFlOSArIGhyWzFdO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBnZXROYW5vU2Vjb25kcygpO1xuICB9IGVsc2UgaWYgKERhdGUubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IERhdGUubm93KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG1hcChvYmplY3RLZXlzKG9iaiksIGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBtYXAob2JqW2tdLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsInZhciBub3cgPSByZXF1aXJlKCdwZXJmb3JtYW5jZS1ub3cnKVxuICAsIHJvb3QgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvd1xuICAsIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnXVxuICAsIHN1ZmZpeCA9ICdBbmltYXRpb25GcmFtZSdcbiAgLCByYWYgPSByb290WydyZXF1ZXN0JyArIHN1ZmZpeF1cbiAgLCBjYWYgPSByb290WydjYW5jZWwnICsgc3VmZml4XSB8fCByb290WydjYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cblxuZm9yKHZhciBpID0gMDsgIXJhZiAmJiBpIDwgdmVuZG9ycy5sZW5ndGg7IGkrKykge1xuICByYWYgPSByb290W3ZlbmRvcnNbaV0gKyAnUmVxdWVzdCcgKyBzdWZmaXhdXG4gIGNhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdDYW5jZWwnICsgc3VmZml4XVxuICAgICAgfHwgcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxufVxuXG4vLyBTb21lIHZlcnNpb25zIG9mIEZGIGhhdmUgckFGIGJ1dCBub3QgY0FGXG5pZighcmFmIHx8ICFjYWYpIHtcbiAgdmFyIGxhc3QgPSAwXG4gICAgLCBpZCA9IDBcbiAgICAsIHF1ZXVlID0gW11cbiAgICAsIGZyYW1lRHVyYXRpb24gPSAxMDAwIC8gNjBcblxuICByYWYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGlmKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFyIF9ub3cgPSBub3coKVxuICAgICAgICAsIG5leHQgPSBNYXRoLm1heCgwLCBmcmFtZUR1cmF0aW9uIC0gKF9ub3cgLSBsYXN0KSlcbiAgICAgIGxhc3QgPSBuZXh0ICsgX25vd1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNwID0gcXVldWUuc2xpY2UoMClcbiAgICAgICAgLy8gQ2xlYXIgcXVldWUgaGVyZSB0byBwcmV2ZW50XG4gICAgICAgIC8vIGNhbGxiYWNrcyBmcm9tIGFwcGVuZGluZyBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdG8gdGhlIGN1cnJlbnQgZnJhbWUncyBxdWV1ZVxuICAgICAgICBxdWV1ZS5sZW5ndGggPSAwXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKCFjcFtpXS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgY3BbaV0uY2FsbGJhY2sobGFzdClcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aHJvdyBlIH0sIDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBNYXRoLnJvdW5kKG5leHQpKVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKHtcbiAgICAgIGhhbmRsZTogKytpZCxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgICB9KVxuICAgIHJldHVybiBpZFxuICB9XG5cbiAgY2FmID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihxdWV1ZVtpXS5oYW5kbGUgPT09IGhhbmRsZSkge1xuICAgICAgICBxdWV1ZVtpXS5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4pIHtcbiAgLy8gV3JhcCBpbiBhIG5ldyBmdW5jdGlvbiB0byBwcmV2ZW50XG4gIC8vIGBjYW5jZWxgIHBvdGVudGlhbGx5IGJlaW5nIGFzc2lnbmVkXG4gIC8vIHRvIHRoZSBuYXRpdmUgckFGIGZ1bmN0aW9uXG4gIHJldHVybiByYWYuY2FsbChyb290LCBmbilcbn1cbm1vZHVsZS5leHBvcnRzLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICBjYWYuYXBwbHkocm9vdCwgYXJndW1lbnRzKVxufVxubW9kdWxlLmV4cG9ydHMucG9seWZpbGwgPSBmdW5jdGlvbigpIHtcbiAgcm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByYWZcbiAgcm9vdC5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhZlxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdyZWFjdC9saWIvc2hhbGxvd0NvbXBhcmUnKTsiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTAuMFxudmFyIFJlYWN0LCBpc1JldGluYSwgbWQ1LCBxdWVyeXN0cmluZztcblxuUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5tZDUgPSByZXF1aXJlKCdtZDUnKTtcblxucXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5pc1JldGluYSA9IHJlcXVpcmUoJ2lzLXJldGluYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdHcmF2YXRhcicsXG4gIHByb3BUeXBlczoge1xuICAgIGVtYWlsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1kNTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIHJhdGluZzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBodHRwczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgXCJkZWZhdWx0XCI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gIH0sXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNpemU6IDUwLFxuICAgICAgcmF0aW5nOiAnZycsXG4gICAgICBodHRwczogZmFsc2UsXG4gICAgICBcImRlZmF1bHRcIjogXCJyZXRyb1wiXG4gICAgfTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYmFzZSwgaGFzaCwgbW9kZXJuQnJvd3NlciwgcXVlcnksIHJldGluYVF1ZXJ5LCByZXRpbmFTcmMsIHNyYztcbiAgICBiYXNlID0gdGhpcy5wcm9wcy5odHRwcyA/IFwiaHR0cHM6Ly9zZWN1cmUuZ3JhdmF0YXIuY29tL2F2YXRhci9cIiA6ICdodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvJztcbiAgICBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7XG4gICAgICBzOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICByOiB0aGlzLnByb3BzLnJhdGluZyxcbiAgICAgIGQ6IHRoaXMucHJvcHNbXCJkZWZhdWx0XCJdXG4gICAgfSk7XG4gICAgcmV0aW5hUXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe1xuICAgICAgczogdGhpcy5wcm9wcy5zaXplICogMixcbiAgICAgIHI6IHRoaXMucHJvcHMucmF0aW5nLFxuICAgICAgZDogdGhpcy5wcm9wc1tcImRlZmF1bHRcIl1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5wcm9wcy5tZDUpIHtcbiAgICAgIGhhc2ggPSB0aGlzLnByb3BzLm1kNTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZW1haWwpIHtcbiAgICAgIGhhc2ggPSBtZDUodGhpcy5wcm9wcy5lbWFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignR3JhdmF0YXIgaW1hZ2UgY2FuIG5vdCBiZSBmZXRjaGVkLiBFaXRoZXIgdGhlIFwiZW1haWxcIiBvciBcIm1kNVwiIHByb3AgbXVzdCBiZSBzcGVjaWZpZWQuJyk7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCBudWxsKTtcbiAgICB9XG4gICAgc3JjID0gYmFzZSArIGhhc2ggKyBcIj9cIiArIHF1ZXJ5O1xuICAgIHJldGluYVNyYyA9IGJhc2UgKyBoYXNoICsgXCI/XCIgKyByZXRpbmFRdWVyeTtcbiAgICBtb2Rlcm5Ccm93c2VyID0gdHJ1ZTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICAgIG1vZGVybkJyb3dzZXIgPSAnc3Jjc2V0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB9XG4gICAgaWYgKCFtb2Rlcm5Ccm93c2VyICYmIGlzUmV0aW5hKCkpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIFJlYWN0Ll9fc3ByZWFkKHtcbiAgICAgICAgXCJzdHlsZVwiOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICBcImNsYXNzTmFtZVwiOiBcInJlYWN0LWdyYXZhdGFyIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIFwic3JjXCI6IHJldGluYVNyYyxcbiAgICAgICAgXCJoZWlnaHRcIjogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICBcIndpZHRoXCI6IHRoaXMucHJvcHMuc2l6ZVxuICAgICAgfSwgdGhpcy5wcm9wcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCBSZWFjdC5fX3NwcmVhZCh7XG4gICAgICAgIFwic3R5bGVcIjogdGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgXCJjbGFzc05hbWVcIjogXCJyZWFjdC1ncmF2YXRhciBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBcInNyY1wiOiBzcmMsXG4gICAgICAgIFwic3JjU2V0XCI6IHJldGluYVNyYyArIFwiIDJ4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgXCJ3aWR0aFwiOiB0aGlzLnByb3BzLnNpemVcbiAgICAgIH0sIHRoaXMucHJvcHMpKTtcbiAgICB9XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RTZWxlY3QgPSByZXF1aXJlKCdyZWFjdC1zZWxlY3QnKTtcblxudmFyIF9yZWFjdFNlbGVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdFNlbGVjdCk7XG5cbnZhciBfcmVhY3RWaXJ0dWFsaXplZCA9IHJlcXVpcmUoJ3JlYWN0LXZpcnR1YWxpemVkJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFZpcnR1YWxpemVkU2VsZWN0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFZpcnR1YWxpemVkU2VsZWN0LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBWaXJ0dWFsaXplZFNlbGVjdChwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWaXJ0dWFsaXplZFNlbGVjdCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVmlydHVhbGl6ZWRTZWxlY3QpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLl9yZW5kZXJNZW51ID0gX3RoaXMuX3JlbmRlck1lbnUuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3Jvd1JlbmRlcmVyID0gX3RoaXMuX3Jvd1JlbmRlcmVyLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhWaXJ0dWFsaXplZFNlbGVjdCwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0U2VsZWN0Mi5kZWZhdWx0LCBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywge1xuICAgICAgICBtZW51UmVuZGVyZXI6IHRoaXMuX3JlbmRlck1lbnUsXG4gICAgICAgIG1lbnVTdHlsZTogeyBvdmVyZmxvdzogJ2hpZGRlbicgfVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vSmVkV2F0c29uL3JlYWN0LXNlbGVjdC8jZWZmZWNpZW50bHktcmVuZGVyaW5nLWxhcmdlLWxpc3RzLXdpdGgtd2luZG93aW5nXG5cbiAgfSwge1xuICAgIGtleTogJ19yZW5kZXJNZW51JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlbmRlck1lbnUoX3JlZikge1xuICAgICAgdmFyIGZvY3VzZWRPcHRpb24gPSBfcmVmLmZvY3VzZWRPcHRpb247XG4gICAgICB2YXIgZm9jdXNPcHRpb24gPSBfcmVmLmZvY3VzT3B0aW9uO1xuICAgICAgdmFyIGxhYmVsS2V5ID0gX3JlZi5sYWJlbEtleTtcbiAgICAgIHZhciBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gX3JlZi5zZWxlY3RWYWx1ZTtcbiAgICAgIHZhciB2YWx1ZUFycmF5ID0gX3JlZi52YWx1ZUFycmF5O1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgbWF4SGVpZ2h0ID0gX3Byb3BzLm1heEhlaWdodDtcbiAgICAgIHZhciBvcHRpb25IZWlnaHQgPSBfcHJvcHMub3B0aW9uSGVpZ2h0O1xuICAgICAgdmFyIHJvd1JlbmRlcmVyID0gX3Byb3BzLnJvd1JlbmRlcmVyO1xuXG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbkluZGV4ID0gb3B0aW9ucy5pbmRleE9mKGZvY3VzZWRPcHRpb24pO1xuICAgICAgdmFyIGhlaWdodCA9IE1hdGgubWluKG1heEhlaWdodCwgb3B0aW9ucy5sZW5ndGggKiBvcHRpb25IZWlnaHQpO1xuICAgICAgdmFyIGlubmVyUm93UmVuZGVyZXIgPSByb3dSZW5kZXJlciB8fCB0aGlzLl9yb3dSZW5kZXJlcjtcblxuICAgICAgZnVuY3Rpb24gd3JhcHBlZFJvd1JlbmRlcmVyKGluZGV4KSB7XG4gICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW2luZGV4XTtcblxuICAgICAgICByZXR1cm4gaW5uZXJSb3dSZW5kZXJlcih7IGZvY3VzZWRPcHRpb246IGZvY3VzZWRPcHRpb24sIGZvY3VzZWRPcHRpb25JbmRleDogZm9jdXNlZE9wdGlvbkluZGV4LCBmb2N1c09wdGlvbjogZm9jdXNPcHRpb24sIGxhYmVsS2V5OiBsYWJlbEtleSwgb3B0aW9uOiBvcHRpb24sIG9wdGlvbnM6IG9wdGlvbnMsIHNlbGVjdFZhbHVlOiBzZWxlY3RWYWx1ZSwgdmFsdWVBcnJheTogdmFsdWVBcnJheSB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBfcmVhY3RWaXJ0dWFsaXplZC5BdXRvU2l6ZXIsXG4gICAgICAgIHsgZGlzYWJsZUhlaWdodDogdHJ1ZSB9LFxuICAgICAgICBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgICB2YXIgd2lkdGggPSBfcmVmMi53aWR0aDtcbiAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0VmlydHVhbGl6ZWQuVmlydHVhbFNjcm9sbCwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnVmlydHVhbFNlbGVjdEdyaWQnLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICByb3dIZWlnaHQ6IG9wdGlvbkhlaWdodCxcbiAgICAgICAgICAgIHJvd1JlbmRlcmVyOiB3cmFwcGVkUm93UmVuZGVyZXIsXG4gICAgICAgICAgICByb3dzQ291bnQ6IG9wdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgc2Nyb2xsVG9JbmRleDogZm9jdXNlZE9wdGlvbkluZGV4LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3Jvd1JlbmRlcmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3Jvd1JlbmRlcmVyKF9yZWYzKSB7XG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbiA9IF9yZWYzLmZvY3VzZWRPcHRpb247XG4gICAgICB2YXIgZm9jdXNPcHRpb24gPSBfcmVmMy5mb2N1c09wdGlvbjtcbiAgICAgIHZhciBsYWJlbEtleSA9IF9yZWYzLmxhYmVsS2V5O1xuICAgICAgdmFyIG9wdGlvbiA9IF9yZWYzLm9wdGlvbjtcbiAgICAgIHZhciBzZWxlY3RWYWx1ZSA9IF9yZWYzLnNlbGVjdFZhbHVlO1xuICAgICAgdmFyIG9wdGlvbkhlaWdodCA9IHRoaXMucHJvcHMub3B0aW9uSGVpZ2h0O1xuXG5cbiAgICAgIHZhciBjbGFzc05hbWUgPSBvcHRpb24gPT09IGZvY3VzZWRPcHRpb24gPyAnVmlydHVhbGl6ZWRTZWxlY3RPcHRpb24gVmlydHVhbGl6ZWRTZWxlY3RGb2N1c2VkT3B0aW9uJyA6ICdWaXJ0dWFsaXplZFNlbGVjdE9wdGlvbic7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBvbk1vdXNlT3ZlcjogZnVuY3Rpb24gb25Nb3VzZU92ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9jdXNPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0VmFsdWUob3B0aW9uKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IG9wdGlvbkhlaWdodFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uW2xhYmVsS2V5XVxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVmlydHVhbGl6ZWRTZWxlY3Q7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5WaXJ0dWFsaXplZFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIG1heEhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgb3B0aW9uSGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICByb3dSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuVmlydHVhbGl6ZWRTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBtYXhIZWlnaHQ6IDIwMCxcbiAgb3B0aW9uSGVpZ2h0OiAzNVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZpcnR1YWxpemVkU2VsZWN0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9WaXJ0dWFsaXplZFNlbGVjdCA9IHJlcXVpcmUoJy4vVmlydHVhbGl6ZWRTZWxlY3QnKTtcblxudmFyIF9WaXJ0dWFsaXplZFNlbGVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9WaXJ0dWFsaXplZFNlbGVjdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9WaXJ0dWFsaXplZFNlbGVjdDIuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBUaGlzIEhPQyBkZWNvcmF0ZXMgYSB2aXJ0dWFsaXplZCBjb21wb25lbnQgYW5kIHJlc3BvbmRzIHRvIGFycm93LWtleSBldmVudHMgYnkgc2Nyb2xsaW5nIG9uZSByb3cgb3IgY29sdW1uIGF0IGEgdGltZS5cbiAqL1xuXG52YXIgQXJyb3dLZXlTdGVwcGVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEFycm93S2V5U3RlcHBlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQXJyb3dLZXlTdGVwcGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFycm93S2V5U3RlcHBlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXJyb3dLZXlTdGVwcGVyKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNjcm9sbFRvQ29sdW1uOiAwLFxuICAgICAgc2Nyb2xsVG9Sb3c6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX2NvbHVtblN0YXJ0SW5kZXggPSAwO1xuICAgIF90aGlzLl9jb2x1bW5TdG9wSW5kZXggPSAwO1xuICAgIF90aGlzLl9yb3dTdGFydEluZGV4ID0gMDtcbiAgICBfdGhpcy5fcm93U3RvcEluZGV4ID0gMDtcblxuICAgIF90aGlzLl9vbktleURvd24gPSBfdGhpcy5fb25LZXlEb3duLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZCA9IF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXJyb3dLZXlTdGVwcGVyLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IF9zdGF0ZS5zY3JvbGxUb0NvbHVtbjtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9zdGF0ZS5zY3JvbGxUb1JvdztcblxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgICAgb25LZXlEb3duOiB0aGlzLl9vbktleURvd25cbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW4oe1xuICAgICAgICAgIG9uU2VjdGlvblJlbmRlcmVkOiB0aGlzLl9vblNlY3Rpb25SZW5kZXJlZCxcbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbjogc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgICAgc2Nyb2xsVG9Sb3c6IHNjcm9sbFRvUm93XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbktleURvd24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzMi5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMi5yb3dzQ291bnQ7XG5cbiAgICAgIC8vIFRoZSBhYm92ZSBjYXNlcyBhbGwgcHJldmVudCBkZWZhdWx0IGV2ZW50IGV2ZW50IGJlaGF2aW9yLlxuICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIHRoZSBncmlkIGZyb20gc2Nyb2xsaW5nIGFmdGVyIHRoZSBzbmFwLXRvIHVwZGF0ZS5cblxuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c6IE1hdGgubWluKHRoaXMuX3Jvd1N0b3BJbmRleCArIDEsIHJvd3NDb3VudCAtIDEpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uOiBNYXRoLm1heCh0aGlzLl9jb2x1bW5TdGFydEluZGV4IC0gMSwgMClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uOiBNYXRoLm1pbih0aGlzLl9jb2x1bW5TdG9wSW5kZXggKyAxLCBjb2x1bW5zQ291bnQgLSAxKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c6IE1hdGgubWF4KHRoaXMuX3Jvd1N0YXJ0SW5kZXggLSAxLCAwKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNlY3Rpb25SZW5kZXJlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNlY3Rpb25SZW5kZXJlZChfcmVmKSB7XG4gICAgICB2YXIgY29sdW1uU3RhcnRJbmRleCA9IF9yZWYuY29sdW1uU3RhcnRJbmRleDtcbiAgICAgIHZhciBjb2x1bW5TdG9wSW5kZXggPSBfcmVmLmNvbHVtblN0b3BJbmRleDtcbiAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZi5yb3dTdGFydEluZGV4O1xuICAgICAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWYucm93U3RvcEluZGV4O1xuXG4gICAgICB0aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gY29sdW1uU3RhcnRJbmRleDtcbiAgICAgIHRoaXMuX2NvbHVtblN0b3BJbmRleCA9IGNvbHVtblN0b3BJbmRleDtcbiAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPSByb3dTdGFydEluZGV4O1xuICAgICAgdGhpcy5fcm93U3RvcEluZGV4ID0gcm93U3RvcEluZGV4O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBcnJvd0tleVN0ZXBwZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5BcnJvd0tleVN0ZXBwZXIucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQXJyb3dLZXlTdGVwcGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQXJyb3dLZXlTdGVwcGVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlcjIgPSByZXF1aXJlKCcuL0Fycm93S2V5U3RlcHBlcicpO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BcnJvd0tleVN0ZXBwZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0Fycm93S2V5U3RlcHBlcjMuZGVmYXVsdDtcbmV4cG9ydHMuQXJyb3dLZXlTdGVwcGVyID0gX0Fycm93S2V5U3RlcHBlcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBEZWNvcmF0b3IgY29tcG9uZW50IHRoYXQgYXV0b21hdGljYWxseSBhZGp1c3RzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIGEgc2luZ2xlIGNoaWxkLlxuICogQ2hpbGQgY29tcG9uZW50IHNob3VsZCBub3QgYmUgZGVjbGFyZWQgYXMgYSBjaGlsZCBidXQgc2hvdWxkIHJhdGhlciBiZSBzcGVjaWZpZWQgYnkgYSBgQ2hpbGRDb21wb25lbnRgIHByb3BlcnR5LlxuICogQWxsIG90aGVyIHByb3BlcnRpZXMgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgY2hpbGQgY29tcG9uZW50LlxuICovXG5cbnZhciBBdXRvU2l6ZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQXV0b1NpemVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBBdXRvU2l6ZXIocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXV0b1NpemVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihBdXRvU2l6ZXIpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgd2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX29uUmVzaXplID0gX3RoaXMuX29uUmVzaXplLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fc2V0UmVmID0gX3RoaXMuX3NldFJlZi5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXV0b1NpemVyLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAvLyBEZWZlciByZXF1aXJpbmcgcmVzaXplIGhhbmRsZXIgaW4gb3JkZXIgdG8gc3VwcG9ydCBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgICAvLyBTZWUgaXNzdWUgIzQxXG4gICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplID0gcmVxdWlyZSgnLi4vdmVuZG9yL2RldGVjdEVsZW1lbnRSZXNpemUnKTtcbiAgICAgIHRoaXMuX2RldGVjdEVsZW1lbnRSZXNpemUuYWRkUmVzaXplTGlzdGVuZXIodGhpcy5fcGFyZW50Tm9kZSwgdGhpcy5fb25SZXNpemUpO1xuXG4gICAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplLnJlbW92ZVJlc2l6ZUxpc3RlbmVyKHRoaXMuX3BhcmVudE5vZGUsIHRoaXMuX29uUmVzaXplKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBkaXNhYmxlSGVpZ2h0ID0gX3Byb3BzLmRpc2FibGVIZWlnaHQ7XG4gICAgICB2YXIgZGlzYWJsZVdpZHRoID0gX3Byb3BzLmRpc2FibGVXaWR0aDtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGhlaWdodCA9IF9zdGF0ZS5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfc3RhdGUud2lkdGg7XG5cbiAgICAgIC8vIE91dGVyIGRpdiBzaG91bGQgbm90IGZvcmNlIHdpZHRoL2hlaWdodCBzaW5jZSB0aGF0IG1heSBwcmV2ZW50IGNvbnRhaW5lcnMgZnJvbSBzaHJpbmtpbmcuXG4gICAgICAvLyBJbm5lciBjb21wb25lbnQgc2hvdWxkIG92ZXJmbG93IGFuZCB1c2UgY2FsY3VsYXRlZCB3aWR0aC9oZWlnaHQuXG4gICAgICAvLyBTZWUgaXNzdWUgIzY4IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICAgICB2YXIgb3V0ZXJTdHlsZSA9IHsgb3ZlcmZsb3c6ICd2aXNpYmxlJyB9O1xuXG4gICAgICBpZiAoIWRpc2FibGVIZWlnaHQpIHtcbiAgICAgICAgb3V0ZXJTdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRpc2FibGVXaWR0aCkge1xuICAgICAgICBvdXRlclN0eWxlLndpZHRoID0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogdGhpcy5fc2V0UmVmLFxuICAgICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgICBzdHlsZTogb3V0ZXJTdHlsZVxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbih7IGhlaWdodDogaGVpZ2h0LCB3aWR0aDogd2lkdGggfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uUmVzaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uUmVzaXplKCkge1xuICAgICAgdmFyIG9uUmVzaXplID0gdGhpcy5wcm9wcy5vblJlc2l6ZTtcblxuICAgICAgdmFyIF9wYXJlbnROb2RlJGdldEJvdW5kaSA9IHRoaXMuX3BhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIHZhciBoZWlnaHQgPSBfcGFyZW50Tm9kZSRnZXRCb3VuZGkuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3BhcmVudE5vZGUkZ2V0Qm91bmRpLndpZHRoO1xuXG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fcGFyZW50Tm9kZSk7XG4gICAgICB2YXIgcGFkZGluZ0xlZnQgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nTGVmdCwgMTApO1xuICAgICAgdmFyIHBhZGRpbmdSaWdodCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdSaWdodCwgMTApO1xuICAgICAgdmFyIHBhZGRpbmdUb3AgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nVG9wLCAxMCk7XG4gICAgICB2YXIgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdCb3R0b20sIDEwKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogaGVpZ2h0IC0gcGFkZGluZ1RvcCAtIHBhZGRpbmdCb3R0b20sXG4gICAgICAgIHdpZHRoOiB3aWR0aCAtIHBhZGRpbmdMZWZ0IC0gcGFkZGluZ1JpZ2h0XG4gICAgICB9KTtcblxuICAgICAgb25SZXNpemUoeyBoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRoIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChldmVudCkge1xuICAgICAgLy8gUHJldmVudCBkZXRlY3RFbGVtZW50UmVzaXplIGxpYnJhcnkgZnJvbSBiZWluZyB0cmlnZ2VyZWQgYnkgdGhpcyBzY3JvbGwgZXZlbnQuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0UmVmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFJlZihhdXRvU2l6ZXIpIHtcbiAgICAgIC8vIEluIGNhc2UgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB1bm1vdW50ZWRcbiAgICAgIHRoaXMuX3BhcmVudE5vZGUgPSBhdXRvU2l6ZXIgJiYgYXV0b1NpemVyLnBhcmVudE5vZGU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEF1dG9TaXplcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkF1dG9TaXplci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGNoaWxkcmVuLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IGhlaWdodCwgd2lkdGggfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogRGlzYWJsZSBkeW5hbWljIDpoZWlnaHQgcHJvcGVydHkgKi9cbiAgZGlzYWJsZUhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBEaXNhYmxlIGR5bmFtaWMgOndpZHRoIHByb3BlcnR5ICovXG4gIGRpc2FibGVXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIG9uLXJlc2l6ZTogKHsgaGVpZ2h0LCB3aWR0aCB9KSAqL1xuICBvblJlc2l6ZTogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5BdXRvU2l6ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvblJlc2l6ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEF1dG9TaXplcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkF1dG9TaXplciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9BdXRvU2l6ZXIyID0gcmVxdWlyZSgnLi9BdXRvU2l6ZXInKTtcblxudmFyIF9BdXRvU2l6ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQXV0b1NpemVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9BdXRvU2l6ZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkF1dG9TaXplciA9IF9BdXRvU2l6ZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSGlnaC1vcmRlciBjb21wb25lbnQgdGhhdCBhdXRvLWNhbGN1bGF0ZXMgY29sdW1uLXdpZHRocyBmb3IgYEdyaWRgIGNlbGxzLlxuICovXG5cbnZhciBDb2x1bW5TaXplciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhDb2x1bW5TaXplciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sdW1uU2l6ZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sdW1uU2l6ZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbHVtblNpemVyKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fcmVnaXN0ZXJDaGlsZCA9IF90aGlzLl9yZWdpc3RlckNoaWxkLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhDb2x1bW5TaXplciwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNvbHVtbk1heFdpZHRoID0gX3Byb3BzLmNvbHVtbk1heFdpZHRoO1xuICAgICAgdmFyIGNvbHVtbk1pbldpZHRoID0gX3Byb3BzLmNvbHVtbk1pbldpZHRoO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wcy5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMud2lkdGg7XG5cblxuICAgICAgaWYgKGNvbHVtbk1heFdpZHRoICE9PSBwcmV2UHJvcHMuY29sdW1uTWF4V2lkdGggfHwgY29sdW1uTWluV2lkdGggIT09IHByZXZQcm9wcy5jb2x1bW5NaW5XaWR0aCB8fCBjb2x1bW5zQ291bnQgIT09IHByZXZQcm9wcy5jb2x1bW5zQ291bnQgfHwgd2lkdGggIT09IHByZXZQcm9wcy53aWR0aCkge1xuICAgICAgICBpZiAodGhpcy5fcmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMyLmNoaWxkcmVuO1xuICAgICAgdmFyIGNvbHVtbk1heFdpZHRoID0gX3Byb3BzMi5jb2x1bW5NYXhXaWR0aDtcbiAgICAgIHZhciBjb2x1bW5NaW5XaWR0aCA9IF9wcm9wczIuY29sdW1uTWluV2lkdGg7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzMi5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMyLndpZHRoO1xuXG5cbiAgICAgIHZhciBzYWZlQ29sdW1uTWluV2lkdGggPSBjb2x1bW5NaW5XaWR0aCB8fCAxO1xuXG4gICAgICB2YXIgc2FmZUNvbHVtbk1heFdpZHRoID0gY29sdW1uTWF4V2lkdGggPyBNYXRoLm1pbihjb2x1bW5NYXhXaWR0aCwgd2lkdGgpIDogd2lkdGg7XG5cbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IHdpZHRoIC8gY29sdW1uc0NvdW50O1xuICAgICAgY29sdW1uV2lkdGggPSBNYXRoLm1heChzYWZlQ29sdW1uTWluV2lkdGgsIGNvbHVtbldpZHRoKTtcbiAgICAgIGNvbHVtbldpZHRoID0gTWF0aC5taW4oc2FmZUNvbHVtbk1heFdpZHRoLCBjb2x1bW5XaWR0aCk7XG4gICAgICBjb2x1bW5XaWR0aCA9IE1hdGguZmxvb3IoY29sdW1uV2lkdGgpO1xuXG4gICAgICB2YXIgYWRqdXN0ZWRXaWR0aCA9IE1hdGgubWluKHdpZHRoLCBjb2x1bW5XaWR0aCAqIGNvbHVtbnNDb3VudCk7XG5cbiAgICAgIHJldHVybiBjaGlsZHJlbih7XG4gICAgICAgIGFkanVzdGVkV2lkdGg6IGFkanVzdGVkV2lkdGgsXG4gICAgICAgIGdldENvbHVtbldpZHRoOiBmdW5jdGlvbiBnZXRDb2x1bW5XaWR0aCgpIHtcbiAgICAgICAgICByZXR1cm4gY29sdW1uV2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2lzdGVyQ2hpbGQ6IHRoaXMuX3JlZ2lzdGVyQ2hpbGRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19yZWdpc3RlckNoaWxkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlZ2lzdGVyQ2hpbGQoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZCAhPT0gbnVsbCAmJiAhKGNoaWxkIGluc3RhbmNlb2YgX0dyaWQyLmRlZmF1bHQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGNoaWxkIHR5cGUgcmVnaXN0ZXJlZDsgb25seSBHcmlkIGNoaWxkcmVuIGFyZSBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZCA9IGNoaWxkO1xuXG4gICAgICBpZiAodGhpcy5fcmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZC5yZWNvbXB1dGVHcmlkU2l6ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDb2x1bW5TaXplcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkNvbHVtblNpemVyLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgYSB2aXJ0dWFsaXplZCBHcmlkLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IGFkanVzdGVkV2lkdGgsIGdldENvbHVtbldpZHRoLCByZWdpc3RlckNoaWxkIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqXG4gICAqIFRoZSBzcGVjaWZpZWQgOmdldENvbHVtbldpZHRoIGZ1bmN0aW9uIHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIEdyaWQncyA6Y29sdW1uV2lkdGggcHJvcGVydHkuXG4gICAqIFRoZSA6cmVnaXN0ZXJDaGlsZCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBHcmlkJ3MgOnJlZiBwcm9wZXJ0eS5cbiAgICogVGhlIDphZGp1c3RlZFdpZHRoIHByb3BlcnR5IGlzIG9wdGlvbmFsOyBpdCByZWZsZWN0cyB0aGUgbGVzc2VyIG9mIHRoZSBvdmVyYWxsIHdpZHRoIG9yIHRoZSB3aWR0aCBvZiBhbGwgY29sdW1ucy5cbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogT3B0aW9uYWwgbWF4aW11bSBhbGxvd2VkIGNvbHVtbiB3aWR0aCAqL1xuICBjb2x1bW5NYXhXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE9wdGlvbmFsIG1pbmltdW0gYWxsb3dlZCBjb2x1bW4gd2lkdGggKi9cbiAgY29sdW1uTWluV2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBOdW1iZXIgb2YgY29sdW1ucyBpbiBHcmlkIG9yIEZsZXhUYWJsZSBjaGlsZCAqL1xuICBjb2x1bW5zQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFdpZHRoIG9mIEdyaWQgb3IgRmxleFRhYmxlIGNoaWxkICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29sdW1uU2l6ZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Db2x1bW5TaXplciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9Db2x1bW5TaXplcjIgPSByZXF1aXJlKCcuL0NvbHVtblNpemVyJyk7XG5cbnZhciBfQ29sdW1uU2l6ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sdW1uU2l6ZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0NvbHVtblNpemVyMy5kZWZhdWx0O1xuZXhwb3J0cy5Db2x1bW5TaXplciA9IF9Db2x1bW5TaXplcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRDZWxsUmVuZGVyZXIgPSBkZWZhdWx0Q2VsbFJlbmRlcmVyO1xuZXhwb3J0cy5kZWZhdWx0Q2VsbERhdGFHZXR0ZXIgPSBkZWZhdWx0Q2VsbERhdGFHZXR0ZXI7XG5leHBvcnRzLmRlZmF1bHRIZWFkZXJSZW5kZXJlciA9IGRlZmF1bHRIZWFkZXJSZW5kZXJlcjtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IgPSByZXF1aXJlKCcuL1NvcnRJbmRpY2F0b3InKTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRJbmRpY2F0b3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogRGVmYXVsdCBjZWxsIHJlbmRlcmVyIHRoYXQgZGlzcGxheXMgYW4gYXR0cmlidXRlIGFzIGEgc2ltcGxlIHN0cmluZ1xuICogWW91IHNob3VsZCBvdmVycmlkZSB0aGUgY29sdW1uJ3MgY2VsbFJlbmRlcmVyIGlmIHlvdXIgZGF0YSBpcyBzb21lIG90aGVyIHR5cGUgb2Ygb2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q2VsbFJlbmRlcmVyKGNlbGxEYXRhLCBjZWxsRGF0YUtleSwgcm93RGF0YSwgcm93SW5kZXgsIGNvbHVtbkRhdGEpIHtcbiAgaWYgKGNlbGxEYXRhID09PSBudWxsIHx8IGNlbGxEYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFN0cmluZyhjZWxsRGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IGFjY2Vzc29yIGZvciByZXR1cm5pbmcgYSBjZWxsIHZhbHVlIGZvciBhIGdpdmVuIGF0dHJpYnV0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZXhwZWN0cyB0byBvcGVyYXRlIG9uIGVpdGhlciBhIHZhbmlsbGEgT2JqZWN0IG9yIGFuIEltbXV0YWJsZSBNYXAuXG4gKiBZb3Ugc2hvdWxkIG92ZXJyaWRlIHRoZSBjb2x1bW4ncyBjZWxsRGF0YUdldHRlciBpZiB5b3VyIGRhdGEgaXMgc29tZSBvdGhlciB0eXBlIG9mIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENlbGxEYXRhR2V0dGVyKGRhdGFLZXksIHJvd0RhdGEsIGNvbHVtbkRhdGEpIHtcbiAgaWYgKHJvd0RhdGEuZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcm93RGF0YS5nZXQoZGF0YUtleSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvd0RhdGFbZGF0YUtleV07XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IHRhYmxlIGhlYWRlciByZW5kZXJlci5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEhlYWRlclJlbmRlcmVyKF9yZWYpIHtcbiAgdmFyIGNvbHVtbkRhdGEgPSBfcmVmLmNvbHVtbkRhdGE7XG4gIHZhciBkYXRhS2V5ID0gX3JlZi5kYXRhS2V5O1xuICB2YXIgZGlzYWJsZVNvcnQgPSBfcmVmLmRpc2FibGVTb3J0O1xuICB2YXIgbGFiZWwgPSBfcmVmLmxhYmVsO1xuICB2YXIgc29ydEJ5ID0gX3JlZi5zb3J0Qnk7XG4gIHZhciBzb3J0RGlyZWN0aW9uID0gX3JlZi5zb3J0RGlyZWN0aW9uO1xuXG4gIHZhciBzaG93U29ydEluZGljYXRvciA9IHNvcnRCeSA9PT0gZGF0YUtleTtcbiAgdmFyIGNoaWxkcmVuID0gW19yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogJ0ZsZXhUYWJsZV9faGVhZGVyVHJ1bmNhdGVkVGV4dCcsXG4gICAgICBrZXk6ICdsYWJlbCcsXG4gICAgICB0aXRsZTogbGFiZWxcbiAgICB9LFxuICAgIGxhYmVsXG4gICldO1xuXG4gIGlmIChzaG93U29ydEluZGljYXRvcikge1xuICAgIGNoaWxkcmVuLnB1c2goX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1NvcnRJbmRpY2F0b3IyLmRlZmF1bHQsIHtcbiAgICAgIGtleTogJ1NvcnRJbmRpY2F0b3InLFxuICAgICAgc29ydERpcmVjdGlvbjogc29ydERpcmVjdGlvblxuICAgIH0pKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGhlYWRlciBhbmQgY2VsbCBjb250ZW50cyBvZiBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuXG52YXIgQ29sdW1uID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENvbHVtbiwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sdW1uKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2x1bW4pO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2x1bW4pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIENvbHVtbjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkNvbHVtbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGNlbGxEYXRhR2V0dGVyOiBkZWZhdWx0Q2VsbERhdGFHZXR0ZXIsXG4gIGNlbGxSZW5kZXJlcjogZGVmYXVsdENlbGxSZW5kZXJlcixcbiAgZmxleEdyb3c6IDAsXG4gIGZsZXhTaHJpbms6IDEsXG4gIGhlYWRlclJlbmRlcmVyOiBkZWZhdWx0SGVhZGVyUmVuZGVyZXJcbn07XG5Db2x1bW4ucHJvcFR5cGVzID0ge1xuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIGNlbGwgKi9cbiAgY2VsbENsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgYSBjZWxsJ3MgZGF0YSwgZ2l2ZW4gaXRzIDpkYXRhS2V5XG4gICAqIChkYXRhS2V5OiBzdHJpbmcsIHJvd0RhdGE6IGFueSk6IGFueVxuICAgKi9cbiAgY2VsbERhdGFHZXR0ZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNlbGwncyBjb250ZW50cy5cbiAgICogKGNlbGxEYXRhOiBhbnksIGNlbGxEYXRhS2V5OiBzdHJpbmcsIHJvd0RhdGE6IGFueSwgcm93SW5kZXg6IG51bWJlciwgY29sdW1uRGF0YTogYW55KTogZWxlbWVudFxuICAgKi9cbiAgY2VsbFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqIE9wdGlvbmFsIGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgdG8gdGhpcyBjb2x1bW4ncyA6Y2VsbERhdGFHZXR0ZXIgKi9cbiAgY29sdW1uRGF0YTogX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqIFVuaXF1ZWx5IGlkZW50aWZpZXMgdGhlIHJvdy1kYXRhIGF0dHJpYnV0ZSBjb3JyZXNwbmRpbmcgdG8gdGhpcyBjZWxsICovXG4gIGRhdGFLZXk6IF9yZWFjdC5Qcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG5cbiAgLyoqIElmIHNvcnQgaXMgZW5hYmxlZCBmb3IgdGhlIHRhYmxlIGF0IGxhcmdlLCBkaXNhYmxlIGl0IGZvciB0aGlzIGNvbHVtbiAqL1xuICBkaXNhYmxlU29ydDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBGbGV4IGdyb3cgc3R5bGU7IGRlZmF1bHRzIHRvIDAgKi9cbiAgZmxleEdyb3c6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBGbGV4IHNocmluayBzdHlsZTsgZGVmYXVsdHMgdG8gMSAqL1xuICBmbGV4U2hyaW5rOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIHRoaXMgY29sdW1uJ3MgaGVhZGVyICovXG4gIGhlYWRlckNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGNhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBjb2x1bW4gaGVhZGVyIGNvbnRlbnRzLlxuICAgKiAoeyBjb2x1bW5EYXRhOiBvYmplY3QsIGRhdGFLZXk6IHN0cmluZywgZGlzYWJsZVNvcnQ6IGJvb2xlYW4sIGxhYmVsOiBzdHJpbmcsIHNvcnRCeTogc3RyaW5nLCBzb3J0RGlyZWN0aW9uOiBzdHJpbmcgfSk6IFByb3BUeXBlcy5ub2RlXG4gICAqL1xuICBoZWFkZXJSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqIEhlYWRlciBsYWJlbCBmb3IgdGhpcyBjb2x1bW4gKi9cbiAgbGFiZWw6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBNYXhpbXVtIHdpZHRoIG9mIGNvbHVtbjsgdGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgYmUgdXNlZCBpZiA6ZmxleEdyb3cgaXMgPiAwLiAqL1xuICBtYXhXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE1pbmltdW0gd2lkdGggb2YgY29sdW1uLiAqL1xuICBtaW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIEZsZXggYmFzaXMgKHdpZHRoKSBmb3IgdGhpcyBjb2x1bW47IFRoaXMgdmFsdWUgY2FuIGdyb3cgb3Igc2hyaW5rIGJhc2VkIG9uIDpmbGV4R3JvdyBhbmQgOmZsZXhTaHJpbmsgcHJvcGVydGllcy4gKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBDb2x1bW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9GbGV4Q29sdW1uID0gcmVxdWlyZSgnLi9GbGV4Q29sdW1uJyk7XG5cbnZhciBfRmxleENvbHVtbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GbGV4Q29sdW1uKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG52YXIgX0dyaWQgPSByZXF1aXJlKCcuLi9HcmlkJyk7XG5cbnZhciBfR3JpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HcmlkKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uID0gcmVxdWlyZSgnLi9Tb3J0RGlyZWN0aW9uJyk7XG5cbnZhciBfU29ydERpcmVjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0RGlyZWN0aW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFRhYmxlIGNvbXBvbmVudCB3aXRoIGZpeGVkIGhlYWRlcnMgYW5kIHZpcnR1YWxpemVkIHJvd3MgZm9yIGltcHJvdmVkIHBlcmZvcm1hbmNlIHdpdGggbGFyZ2UgZGF0YSBzZXRzLlxuICogVGhpcyBjb21wb25lbnQgZXhwZWN0cyBleHBsaWNpdCB3aWR0aCwgaGVpZ2h0LCBhbmQgcGFkZGluZyBwYXJhbWV0ZXJzLlxuICovXG5cbnZhciBGbGV4VGFibGUgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoRmxleFRhYmxlLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBGbGV4VGFibGUocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxleFRhYmxlKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihGbGV4VGFibGUpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgc2Nyb2xsYmFyV2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX2NyZWF0ZVJvdyA9IF90aGlzLl9jcmVhdGVSb3cuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlZSBHcmlkI3JlY29tcHV0ZUdyaWRTaXplXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKEZsZXhUYWJsZSwgW3tcbiAgICBrZXk6ICdyZWNvbXB1dGVSb3dIZWlnaHRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlUm93SGVpZ2h0cygpIHtcbiAgICAgIHRoaXMucmVmcy5HcmlkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMuX3NldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgdGhpcy5fc2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBkaXNhYmxlSGVhZGVyID0gX3Byb3BzLmRpc2FibGVIZWFkZXI7XG4gICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gX3Byb3BzLmhlYWRlckhlaWdodDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMuaGVpZ2h0O1xuICAgICAgdmFyIG5vUm93c1JlbmRlcmVyID0gX3Byb3BzLm5vUm93c1JlbmRlcmVyO1xuICAgICAgdmFyIG9uUm93c1JlbmRlcmVkID0gX3Byb3BzLm9uUm93c1JlbmRlcmVkO1xuICAgICAgdmFyIF9vblNjcm9sbCA9IF9wcm9wcy5vblNjcm9sbDtcbiAgICAgIHZhciBvdmVyc2NhblJvd3NDb3VudCA9IF9wcm9wcy5vdmVyc2NhblJvd3NDb3VudDtcbiAgICAgIHZhciByb3dDbGFzc05hbWUgPSBfcHJvcHMucm93Q2xhc3NOYW1lO1xuICAgICAgdmFyIHJvd0hlaWdodCA9IF9wcm9wcy5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzLnJvd3NDb3VudDtcbiAgICAgIHZhciBzY3JvbGxUb0luZGV4ID0gX3Byb3BzLnNjcm9sbFRvSW5kZXg7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3Byb3BzLnNjcm9sbFRvcDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wcy53aWR0aDtcbiAgICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHRoaXMuc3RhdGUuc2Nyb2xsYmFyV2lkdGg7XG5cblxuICAgICAgdmFyIGF2YWlsYWJsZVJvd3NIZWlnaHQgPSBoZWlnaHQgLSBoZWFkZXJIZWlnaHQ7XG5cbiAgICAgIC8vIFRoaXMgcm93LXJlbmRlcmVyIHdyYXBwZXIgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IGluIG9yZGVyIHRvIHRyaWdnZXIgcmUtcmVuZGVyIHdoZW4gdGhlXG4gICAgICAvLyBzb3J0LWJ5IG9yIHNvcnQtZGlyZWN0aW9uIGhhdmUgY2hhbmdlZCAoZWxzZSBHcmlkIHdpbGwgbm90IHNlZSBhbnkgcHJvcHMgY2hhbmdlcylcbiAgICAgIHZhciByb3dSZW5kZXJlciA9IGZ1bmN0aW9uIHJvd1JlbmRlcmVyKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuX2NyZWF0ZVJvdyhpbmRleCk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgcm93Q2xhc3MgPSByb3dDbGFzc05hbWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd0NsYXNzTmFtZSgtMSkgOiByb3dDbGFzc05hbWU7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZScsIGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgIWRpc2FibGVIZWFkZXIgJiYgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX2hlYWRlclJvdycsIHJvd0NsYXNzKSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0LFxuICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHNjcm9sbGJhcldpZHRoLFxuICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHRoaXMuX2dldFJlbmRlcmVkSGVhZGVyUm93KClcbiAgICAgICAgKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX0dyaWQyLmRlZmF1bHQsIHtcbiAgICAgICAgICByZWY6ICdHcmlkJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdGbGV4VGFibGVfX0dyaWQnLFxuICAgICAgICAgIGNvbHVtbldpZHRoOiB3aWR0aCxcbiAgICAgICAgICBjb2x1bW5zQ291bnQ6IDEsXG4gICAgICAgICAgaGVpZ2h0OiBhdmFpbGFibGVSb3dzSGVpZ2h0LFxuICAgICAgICAgIG5vQ29udGVudFJlbmRlcmVyOiBub1Jvd3NSZW5kZXJlcixcbiAgICAgICAgICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoX3JlZikge1xuICAgICAgICAgICAgdmFyIGNsaWVudEhlaWdodCA9IF9yZWYuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWYuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgcmV0dXJuIF9vblNjcm9sbCh7IGNsaWVudEhlaWdodDogY2xpZW50SGVpZ2h0LCBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoX3JlZjIpIHtcbiAgICAgICAgICAgIHZhciByb3dPdmVyc2NhblN0YXJ0SW5kZXggPSBfcmVmMi5yb3dPdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICAgICAgICB2YXIgcm93T3ZlcnNjYW5TdG9wSW5kZXggPSBfcmVmMi5yb3dPdmVyc2NhblN0b3BJbmRleDtcbiAgICAgICAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZjIucm93U3RhcnRJbmRleDtcbiAgICAgICAgICAgIHZhciByb3dTdG9wSW5kZXggPSBfcmVmMi5yb3dTdG9wSW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gb25Sb3dzUmVuZGVyZWQoe1xuICAgICAgICAgICAgICBvdmVyc2NhblN0YXJ0SW5kZXg6IHJvd092ZXJzY2FuU3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgb3ZlcnNjYW5TdG9wSW5kZXg6IHJvd092ZXJzY2FuU3RvcEluZGV4LFxuICAgICAgICAgICAgICBzdGFydEluZGV4OiByb3dTdGFydEluZGV4LFxuICAgICAgICAgICAgICBzdG9wSW5kZXg6IHJvd1N0b3BJbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdmVyc2NhblJvd3NDb3VudDogb3ZlcnNjYW5Sb3dzQ291bnQsXG4gICAgICAgICAgcmVuZGVyQ2VsbDogZnVuY3Rpb24gcmVuZGVyQ2VsbChfcmVmMykge1xuICAgICAgICAgICAgdmFyIGNvbHVtbkluZGV4ID0gX3JlZjMuY29sdW1uSW5kZXg7XG4gICAgICAgICAgICB2YXIgcm93SW5kZXggPSBfcmVmMy5yb3dJbmRleDtcbiAgICAgICAgICAgIHJldHVybiByb3dSZW5kZXJlcihyb3dJbmRleCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByb3dIZWlnaHQ6IHJvd0hlaWdodCxcbiAgICAgICAgICByb3dzQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgICBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9JbmRleCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NyZWF0ZUNvbHVtbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVDb2x1bW4oY29sdW1uLCBjb2x1bW5JbmRleCwgcm93RGF0YSwgcm93SW5kZXgpIHtcbiAgICAgIHZhciBfY29sdW1uJHByb3BzID0gY29sdW1uLnByb3BzO1xuICAgICAgdmFyIGNlbGxDbGFzc05hbWUgPSBfY29sdW1uJHByb3BzLmNlbGxDbGFzc05hbWU7XG4gICAgICB2YXIgY2VsbERhdGFHZXR0ZXIgPSBfY29sdW1uJHByb3BzLmNlbGxEYXRhR2V0dGVyO1xuICAgICAgdmFyIGNvbHVtbkRhdGEgPSBfY29sdW1uJHByb3BzLmNvbHVtbkRhdGE7XG4gICAgICB2YXIgZGF0YUtleSA9IF9jb2x1bW4kcHJvcHMuZGF0YUtleTtcbiAgICAgIHZhciBjZWxsUmVuZGVyZXIgPSBfY29sdW1uJHByb3BzLmNlbGxSZW5kZXJlcjtcblxuICAgICAgdmFyIGNlbGxEYXRhID0gY2VsbERhdGFHZXR0ZXIoZGF0YUtleSwgcm93RGF0YSwgY29sdW1uRGF0YSk7XG4gICAgICB2YXIgcmVuZGVyZWRDZWxsID0gY2VsbFJlbmRlcmVyKGNlbGxEYXRhLCBkYXRhS2V5LCByb3dEYXRhLCByb3dJbmRleCwgY29sdW1uRGF0YSk7XG5cbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuX2dldEZsZXhTdHlsZUZvckNvbHVtbihjb2x1bW4pO1xuXG4gICAgICB2YXIgdGl0bGUgPSB0eXBlb2YgcmVuZGVyZWRDZWxsID09PSAnc3RyaW5nJyA/IHJlbmRlcmVkQ2VsbCA6IG51bGw7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICdSb3cnICsgcm93SW5kZXggKyAnLUNvbCcgKyBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9fcm93Q29sdW1uJywgY2VsbENsYXNzTmFtZSksXG4gICAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICAgIH0sXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0ZsZXhUYWJsZV9fdHJ1bmNhdGVkQ29sdW1uVGV4dCcsXG4gICAgICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbmRlcmVkQ2VsbFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVIZWFkZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY3JlYXRlSGVhZGVyKGNvbHVtbiwgY29sdW1uSW5kZXgpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBoZWFkZXJDbGFzc05hbWUgPSBfcHJvcHMyLmhlYWRlckNsYXNzTmFtZTtcbiAgICAgIHZhciBvbkhlYWRlckNsaWNrID0gX3Byb3BzMi5vbkhlYWRlckNsaWNrO1xuICAgICAgdmFyIHNvcnQgPSBfcHJvcHMyLnNvcnQ7XG4gICAgICB2YXIgc29ydEJ5ID0gX3Byb3BzMi5zb3J0Qnk7XG4gICAgICB2YXIgc29ydERpcmVjdGlvbiA9IF9wcm9wczIuc29ydERpcmVjdGlvbjtcbiAgICAgIHZhciBfY29sdW1uJHByb3BzMiA9IGNvbHVtbi5wcm9wcztcbiAgICAgIHZhciBkYXRhS2V5ID0gX2NvbHVtbiRwcm9wczIuZGF0YUtleTtcbiAgICAgIHZhciBkaXNhYmxlU29ydCA9IF9jb2x1bW4kcHJvcHMyLmRpc2FibGVTb3J0O1xuICAgICAgdmFyIGhlYWRlclJlbmRlcmVyID0gX2NvbHVtbiRwcm9wczIuaGVhZGVyUmVuZGVyZXI7XG4gICAgICB2YXIgbGFiZWwgPSBfY29sdW1uJHByb3BzMi5sYWJlbDtcbiAgICAgIHZhciBjb2x1bW5EYXRhID0gX2NvbHVtbiRwcm9wczIuY29sdW1uRGF0YTtcblxuICAgICAgdmFyIHNvcnRFbmFibGVkID0gIWRpc2FibGVTb3J0ICYmIHNvcnQ7XG5cbiAgICAgIHZhciBjbGFzc05hbWVzID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19oZWFkZXJDb2x1bW4nLCBoZWFkZXJDbGFzc05hbWUsIGNvbHVtbi5wcm9wcy5oZWFkZXJDbGFzc05hbWUsIHtcbiAgICAgICAgJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJDb2x1bW4nOiBzb3J0RW5hYmxlZFxuICAgICAgfSk7XG4gICAgICB2YXIgc3R5bGUgPSB0aGlzLl9nZXRGbGV4U3R5bGVGb3JDb2x1bW4oY29sdW1uKTtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHNvcnRhYmxlIGhlYWRlciwgY2xpY2tpbmcgaXQgc2hvdWxkIHVwZGF0ZSB0aGUgdGFibGUgZGF0YSdzIHNvcnRpbmcuXG4gICAgICB2YXIgbmV3U29ydERpcmVjdGlvbiA9IHNvcnRCeSAhPT0gZGF0YUtleSB8fCBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDID8gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDIDogX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQztcbiAgICAgIHZhciBvbkNsaWNrID0gZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgc29ydEVuYWJsZWQgJiYgc29ydChkYXRhS2V5LCBuZXdTb3J0RGlyZWN0aW9uKTtcbiAgICAgICAgb25IZWFkZXJDbGljayhkYXRhS2V5LCBjb2x1bW5EYXRhKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciByZW5kZXJlZEhlYWRlciA9IGhlYWRlclJlbmRlcmVyKHtcbiAgICAgICAgY29sdW1uRGF0YTogY29sdW1uRGF0YSxcbiAgICAgICAgZGF0YUtleTogZGF0YUtleSxcbiAgICAgICAgZGlzYWJsZVNvcnQ6IGRpc2FibGVTb3J0LFxuICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgIHNvcnRCeTogc29ydEJ5LFxuICAgICAgICBzb3J0RGlyZWN0aW9uOiBzb3J0RGlyZWN0aW9uXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ0hlYWRlci1Db2wnICsgY29sdW1uSW5kZXgsXG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzLFxuICAgICAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrXG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcmVkSGVhZGVyXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVSb3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY3JlYXRlUm93KHJvd0luZGV4KSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzMy5jaGlsZHJlbjtcbiAgICAgIHZhciBvblJvd0NsaWNrID0gX3Byb3BzMy5vblJvd0NsaWNrO1xuICAgICAgdmFyIHJvd0NsYXNzTmFtZSA9IF9wcm9wczMucm93Q2xhc3NOYW1lO1xuICAgICAgdmFyIHJvd0dldHRlciA9IF9wcm9wczMucm93R2V0dGVyO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gdGhpcy5zdGF0ZS5zY3JvbGxiYXJXaWR0aDtcblxuXG4gICAgICB2YXIgcm93Q2xhc3MgPSByb3dDbGFzc05hbWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd0NsYXNzTmFtZShyb3dJbmRleCkgOiByb3dDbGFzc05hbWU7XG4gICAgICB2YXIgcm93RGF0YSA9IHJvd0dldHRlcihyb3dJbmRleCk7XG5cbiAgICAgIHZhciByZW5kZXJlZFJvdyA9IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIGZ1bmN0aW9uIChjb2x1bW4sIGNvbHVtbkluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpczMuX2NyZWF0ZUNvbHVtbihjb2x1bW4sIGNvbHVtbkluZGV4LCByb3dEYXRhLCByb3dJbmRleCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogcm93SW5kZXgsXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX3JvdycsIHJvd0NsYXNzKSxcbiAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uUm93Q2xpY2socm93SW5kZXgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5fZ2V0Um93SGVpZ2h0KHJvd0luZGV4KSxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogc2Nyb2xsYmFyV2lkdGhcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcmVkUm93XG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgdGhlIGZsZXgtc2hyaW5rLCBmbGV4LWdyb3csIGFuZCB3aWR0aCB2YWx1ZXMgZm9yIGEgY2VsbCAoaGVhZGVyIG9yIGNvbHVtbikuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19nZXRGbGV4U3R5bGVGb3JDb2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0RmxleFN0eWxlRm9yQ29sdW1uKGNvbHVtbikge1xuICAgICAgdmFyIGZsZXhWYWx1ZSA9IGNvbHVtbi5wcm9wcy5mbGV4R3JvdyArICcgJyArIGNvbHVtbi5wcm9wcy5mbGV4U2hyaW5rICsgJyAnICsgY29sdW1uLnByb3BzLndpZHRoICsgJ3B4JztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBmbGV4OiBmbGV4VmFsdWUsXG4gICAgICAgIG1zRmxleDogZmxleFZhbHVlLFxuICAgICAgICBXZWJraXRGbGV4OiBmbGV4VmFsdWVcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2x1bW4ucHJvcHMubWF4V2lkdGgpIHtcbiAgICAgICAgc3R5bGUubWF4V2lkdGggPSBjb2x1bW4ucHJvcHMubWF4V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW4ucHJvcHMubWluV2lkdGgpIHtcbiAgICAgICAgc3R5bGUubWluV2lkdGggPSBjb2x1bW4ucHJvcHMubWluV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0UmVuZGVyZWRIZWFkZXJSb3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0UmVuZGVyZWRIZWFkZXJSb3coKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczQgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzNC5jaGlsZHJlbjtcbiAgICAgIHZhciBkaXNhYmxlSGVhZGVyID0gX3Byb3BzNC5kaXNhYmxlSGVhZGVyO1xuXG4gICAgICB2YXIgaXRlbXMgPSBkaXNhYmxlSGVhZGVyID8gW10gOiBjaGlsZHJlbjtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi5tYXAoaXRlbXMsIGZ1bmN0aW9uIChjb2x1bW4sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpczQuX2NyZWF0ZUhlYWRlcihjb2x1bW4sIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRSb3dIZWlnaHQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0Um93SGVpZ2h0KHJvd0luZGV4KSB7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gdGhpcy5wcm9wcy5yb3dIZWlnaHQ7XG5cblxuICAgICAgcmV0dXJuIHJvd0hlaWdodCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gcm93SGVpZ2h0KHJvd0luZGV4KSA6IHJvd0hlaWdodDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0U2Nyb2xsYmFyV2lkdGgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0U2Nyb2xsYmFyV2lkdGgoKSB7XG4gICAgICB2YXIgR3JpZCA9ICgwLCBfcmVhY3REb20uZmluZERPTU5vZGUpKHRoaXMucmVmcy5HcmlkKTtcbiAgICAgIHZhciBjbGllbnRXaWR0aCA9IEdyaWQuY2xpZW50V2lkdGggfHwgMDtcbiAgICAgIHZhciBvZmZzZXRXaWR0aCA9IEdyaWQub2Zmc2V0V2lkdGggfHwgMDtcbiAgICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IG9mZnNldFdpZHRoIC0gY2xpZW50V2lkdGg7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBzY3JvbGxiYXJXaWR0aDogc2Nyb2xsYmFyV2lkdGggfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZsZXhUYWJsZTtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkZsZXhUYWJsZS5wcm9wVHlwZXMgPSB7XG4gIC8qKiBPbmUgb3IgbW9yZSBGbGV4Q29sdW1ucyBkZXNjcmliaW5nIHRoZSBkYXRhIGRpc3BsYXllZCBpbiB0aGlzIHJvdyAqL1xuICBjaGlsZHJlbjogZnVuY3Rpb24gY2hpbGRyZW4ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkocHJvcHMuY2hpbGRyZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjaGlsZHJlbltpXS50eXBlICE9PSBfRmxleENvbHVtbjIuZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdGbGV4VGFibGUgb25seSBhY2NlcHRzIGNoaWxkcmVuIG9mIHR5cGUgRmxleENvbHVtbicpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIG5hbWUgKi9cbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogRGlzYWJsZSByZW5kZXJpbmcgdGhlIGhlYWRlciBhdCBhbGwgKi9cbiAgZGlzYWJsZUhlYWRlcjogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gYWxsIGNvbHVtbiBoZWFkZXJzICovXG4gIGhlYWRlckNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIEZpeGVkIGhlaWdodCBvZiBoZWFkZXIgcm93ICovXG4gIGhlYWRlckhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogRml4ZWQvYXZhaWxhYmxlIGhlaWdodCBmb3Igb3V0IERPTSBlbGVtZW50ICovXG4gIGhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogT3B0aW9uYWwgcmVuZGVyZXIgdG8gYmUgdXNlZCBpbiBwbGFjZSBvZiB0YWJsZSBib2R5IHJvd3Mgd2hlbiByb3dzQ291bnQgaXMgMCAqL1xuICBub1Jvd3NSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAqIE9wdGlvbmFsIGNhbGxiYWNrIHdoZW4gYSBjb2x1bW4ncyBoZWFkZXIgaXMgY2xpY2tlZC5cbiAgKiAoZGF0YUtleTogc3RyaW5nKTogdm9pZFxuICAqL1xuICBvbkhlYWRlckNsaWNrOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgdGFibGUgcm93LlxuICAgKiAocm93SW5kZXg6IG51bWJlcik6IHZvaWRcbiAgICovXG4gIG9uUm93Q2xpY2s6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzbGljZSBvZiByb3dzIHRoYXQgd2VyZSBqdXN0IHJlbmRlcmVkLlxuICAgKiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IHZvaWRcbiAgICovXG4gIG9uUm93c1JlbmRlcmVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3AgfSk6IHZvaWRcbiAgICovXG4gIG9uU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgdG8gcmVuZGVyIGFib3ZlL2JlbG93IHRoZSB2aXNpYmxlIGJvdW5kcyBvZiB0aGUgbGlzdC5cbiAgICogVGhlc2Ugcm93cyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAqL1xuICBvdmVyc2NhblJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIGFsbCB0YWJsZSByb3dzIChpbmNsdWRpbmcgdGhlIGhlYWRlciByb3cpLlxuICAgKiBUaGlzIHByb3BlcnR5IGNhbiBiZSBhIENTUyBjbGFzcyBuYW1lIChzdHJpbmcpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgY2xhc3MgbmFtZS5cbiAgICogSWYgYSBmdW5jdGlvbiBpcyBwcm92aWRlZCBpdHMgc2lnbmF0dXJlIHNob3VsZCBiZTogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmdcbiAgICovXG4gIHJvd0NsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyBhIGRhdGEgcm93IGdpdmVuIGFuIGluZGV4LlxuICAgKiAoaW5kZXg6IG51bWJlcik6IGFueVxuICAgKi9cbiAgcm93R2V0dGVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgcm93IGhlaWdodCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIGEgcm93IGdpdmVuIGl0cyBpbmRleC5cbiAgICogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBOdW1iZXIgb2Ygcm93cyBpbiB0YWJsZS4gKi9cbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSb3cgaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSkgKi9cbiAgc2Nyb2xsVG9JbmRleDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFZlcnRpY2FsIG9mZnNldC4gKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogU29ydCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgaWYgYSBzb3J0YWJsZSBoZWFkZXIgaXMgY2xpY2tlZC5cbiAgICogKGRhdGFLZXk6IHN0cmluZywgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbik6IHZvaWRcbiAgICovXG4gIHNvcnQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKiogRmxleFRhYmxlIGRhdGEgaXMgY3VycmVudGx5IHNvcnRlZCBieSB0aGlzIDpkYXRhS2V5IChpZiBpdCBpcyBzb3J0ZWQgYXQgYWxsKSAqL1xuICBzb3J0Qnk6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBGbGV4VGFibGUgZGF0YSBpcyBjdXJyZW50bHkgc29ydGVkIGluIHRoaXMgZGlyZWN0aW9uIChpZiBpdCBpcyBzb3J0ZWQgYXQgYWxsKSAqL1xuICBzb3J0RGlyZWN0aW9uOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MsIF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0NdKSxcblxuICAvKiogV2lkdGggb2YgbGlzdCAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbkZsZXhUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc2FibGVIZWFkZXI6IGZhbHNlLFxuICBoZWFkZXJIZWlnaHQ6IDAsXG4gIG5vUm93c1JlbmRlcmVyOiBmdW5jdGlvbiBub1Jvd3NSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25IZWFkZXJDbGljazogZnVuY3Rpb24gb25IZWFkZXJDbGljaygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25Sb3dDbGljazogZnVuY3Rpb24gb25Sb3dDbGljaygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25Sb3dzUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUm93c1JlbmRlcmVkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG92ZXJzY2FuUm93c0NvdW50OiAxMFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEZsZXhUYWJsZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgU29ydERpcmVjdGlvbiA9IHtcbiAgLyoqXG4gICAqIFNvcnQgaXRlbXMgaW4gYXNjZW5kaW5nIG9yZGVyLlxuICAgKiBUaGlzIG1lYW5zIGFycmFuZ2luZyBmcm9tIHRoZSBsb3dlc3QgdmFsdWUgdG8gdGhlIGhpZ2hlc3QgKGUuZy4gYS16LCAwLTkpLlxuICAgKi9cbiAgQVNDOiAnQVNDJyxcblxuICAvKipcbiAgICogU29ydCBpdGVtcyBpbiBkZXNjZW5kaW5nIG9yZGVyLlxuICAgKiBUaGlzIG1lYW5zIGFycmFuZ2luZyBmcm9tIHRoZSBoaWdoZXN0IHZhbHVlIHRvIHRoZSBsb3dlc3QgKGUuZy4gei1hLCA5LTApLlxuICAgKi9cbiAgREVTQzogJ0RFU0MnXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTb3J0RGlyZWN0aW9uOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFNvcnRJbmRpY2F0b3I7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfU29ydERpcmVjdGlvbiA9IHJlcXVpcmUoJy4vU29ydERpcmVjdGlvbicpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydERpcmVjdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogRGlzcGxheWVkIGJlc2lkZSBhIGhlYWRlciB0byBpbmRpY2F0ZSB0aGF0IGEgRmxleFRhYmxlIGlzIGN1cnJlbnRseSBzb3J0ZWQgYnkgdGhpcyBjb2x1bW4uXG4gKi9cbmZ1bmN0aW9uIFNvcnRJbmRpY2F0b3IoX3JlZikge1xuICB2YXIgc29ydERpcmVjdGlvbiA9IF9yZWYuc29ydERpcmVjdGlvbjtcblxuICB2YXIgY2xhc3NOYW1lcyA9ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJJY29uJywge1xuICAgICdGbGV4VGFibGVfX3NvcnRhYmxlSGVhZGVySWNvbi0tQVNDJzogc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDLFxuICAgICdGbGV4VGFibGVfX3NvcnRhYmxlSGVhZGVySWNvbi0tREVTQyc6IHNvcnREaXJlY3Rpb24gPT09IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0NcbiAgfSk7XG5cbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdzdmcnLFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyxcbiAgICAgIHdpZHRoOiAxOCxcbiAgICAgIGhlaWdodDogMTgsXG4gICAgICB2aWV3Qm94OiAnMCAwIDI0IDI0JyxcbiAgICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG4gICAgfSxcbiAgICBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ003IDE0bDUtNSA1IDV6JyB9KSA6IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTcgMTBsNSA1IDUtNXonIH0pLFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTAgMGgyNHYyNEgweicsIGZpbGw6ICdub25lJyB9KVxuICApO1xufVxuU29ydEluZGljYXRvci5wcm9wVHlwZXMgPSB7XG4gIHNvcnREaXJlY3Rpb246IF9yZWFjdC5Qcm9wVHlwZXMub25lT2YoW19Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQywgX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQ10pXG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU29ydEluZGljYXRvciA9IGV4cG9ydHMuU29ydERpcmVjdGlvbiA9IGV4cG9ydHMuRmxleENvbHVtbiA9IGV4cG9ydHMuRmxleFRhYmxlID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0ZsZXhUYWJsZTIgPSByZXF1aXJlKCcuL0ZsZXhUYWJsZScpO1xuXG52YXIgX0ZsZXhUYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GbGV4VGFibGUyKTtcblxudmFyIF9GbGV4Q29sdW1uMiA9IHJlcXVpcmUoJy4vRmxleENvbHVtbicpO1xuXG52YXIgX0ZsZXhDb2x1bW4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmxleENvbHVtbjIpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24yID0gcmVxdWlyZSgnLi9Tb3J0RGlyZWN0aW9uJyk7XG5cbnZhciBfU29ydERpcmVjdGlvbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0RGlyZWN0aW9uMik7XG5cbnZhciBfU29ydEluZGljYXRvcjIgPSByZXF1aXJlKCcuL1NvcnRJbmRpY2F0b3InKTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRJbmRpY2F0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0ZsZXhUYWJsZTMuZGVmYXVsdDtcbmV4cG9ydHMuRmxleFRhYmxlID0gX0ZsZXhUYWJsZTMuZGVmYXVsdDtcbmV4cG9ydHMuRmxleENvbHVtbiA9IF9GbGV4Q29sdW1uMy5kZWZhdWx0O1xuZXhwb3J0cy5Tb3J0RGlyZWN0aW9uID0gX1NvcnREaXJlY3Rpb24zLmRlZmF1bHQ7XG5leHBvcnRzLlNvcnRJbmRpY2F0b3IgPSBfU29ydEluZGljYXRvcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfR3JpZFV0aWxzID0gcmVxdWlyZSgnLi9HcmlkVXRpbHMnKTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfcmFmID0gcmVxdWlyZSgncmFmJyk7XG5cbnZhciBfcmFmMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JhZik7XG5cbnZhciBfc2Nyb2xsYmFyU2l6ZSA9IHJlcXVpcmUoJ2RvbS1oZWxwZXJzL3V0aWwvc2Nyb2xsYmFyU2l6ZScpO1xuXG52YXIgX3Njcm9sbGJhclNpemUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Nyb2xsYmFyU2l6ZSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhlIG51bWJlciBvZiBtaWxpc2Vjb25kcyBkdXJpbmcgd2hpY2ggdG8gZGlzYWJsZSBwb2ludGVyIGV2ZW50cyB3aGlsZSBhIHNjcm9sbCBpcyBpbiBwcm9ncmVzcy5cbiAqIFRoaXMgaW1wcm92ZXMgcGVyZm9ybWFuY2UgYW5kIG1ha2VzIHNjcm9sbGluZyBzbW9vdGhlci5cbiAqL1xudmFyIElTX1NDUk9MTElOR19USU1FT1VUID0gMTUwO1xuXG4vKipcbiAqIENvbnRyb2xzIHdoZXRoZXIgdGhlIEdyaWQgdXBkYXRlcyB0aGUgRE9NIGVsZW1lbnQncyBzY3JvbGxMZWZ0L3Njcm9sbFRvcCBiYXNlZCBvbiB0aGUgY3VycmVudCBzdGF0ZSBvciBqdXN0IG9ic2VydmVzIGl0LlxuICogVGhpcyBwcmV2ZW50cyBHcmlkIGZyb20gaW50ZXJydXB0aW5nIG1vdXNlLXdoZWVsIGFuaW1hdGlvbnMgKHNlZSBpc3N1ZSAjMikuXG4gKi9cbnZhciBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMgPSB7XG4gIE9CU0VSVkVEOiAnb2JzZXJ2ZWQnLFxuICBSRVFVRVNURUQ6ICdyZXF1ZXN0ZWQnXG59O1xuXG4vKipcbiAqIFJlbmRlcnMgdGFidWxhciBkYXRhIHdpdGggdmlydHVhbGl6YXRpb24gYWxvbmcgdGhlIHZlcnRpY2FsIGFuZCBob3Jpem9udGFsIGF4ZXMuXG4gKiBSb3cgaGVpZ2h0cyBhbmQgY29sdW1uIHdpZHRocyBtdXN0IGJlIGtub3duIGFoZWFkIG9mIHRpbWUgYW5kIHNwZWNpZmllZCBhcyBwcm9wZXJ0aWVzLlxuICovXG5cbnZhciBHcmlkID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEdyaWQsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEdyaWQocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR3JpZCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR3JpZCkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBjb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlOiBmYWxzZSxcbiAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9O1xuXG4gICAgLy8gSW52b2tlcyBvblNlY3Rpb25SZW5kZXJlZCBjYWxsYmFjayBvbmx5IHdoZW4gc3RhcnQvc3RvcCByb3cgb3IgY29sdW1uIGluZGljZXMgY2hhbmdlXG4gICAgX3RoaXMuX29uR3JpZFJlbmRlcmVkTWVtb2l6ZXIgPSAoMCwgX0dyaWRVdGlscy5jcmVhdGVDYWxsYmFja01lbW9pemVyKSgpO1xuICAgIF90aGlzLl9vblNjcm9sbE1lbW9pemVyID0gKDAsIF9HcmlkVXRpbHMuY3JlYXRlQ2FsbGJhY2tNZW1vaXplcikoZmFsc2UpO1xuXG4gICAgLy8gQmluZCBmdW5jdGlvbnMgdG8gaW5zdGFuY2Ugc28gdGhleSBkb24ndCBsb3NlIGNvbnRleHQgd2hlbiBwYXNzZWQgYXJvdW5kXG4gICAgX3RoaXMuX2NvbXB1dGVDb2x1bW5NZXRhZGF0YSA9IF90aGlzLl9jb21wdXRlQ29sdW1uTWV0YWRhdGEuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX2NvbXB1dGVSb3dNZXRhZGF0YSA9IF90aGlzLl9jb21wdXRlUm93TWV0YWRhdGEuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyID0gX3RoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uID0gX3RoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3cgPSBfdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3cuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlZCByZWNvbXB1dGUgb2Ygcm93IGhlaWdodHMgYW5kIGNvbHVtbiB3aWR0aHMuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBpZiBkeW5hbWljIGNvbHVtbiBvciByb3cgc2l6ZXMgaGF2ZSBjaGFuZ2VkIGJ1dCBub3RoaW5nIGVsc2UgaGFzLlxuICAgKiBTaW5jZSBHcmlkIG9ubHkgcmVjZWl2ZXMgOmNvbHVtbnNDb3VudCBhbmQgOnJvd3NDb3VudCBpdCBoYXMgbm8gd2F5IG9mIGRldGVjdGluZyB3aGVuIHRoZSB1bmRlcmx5aW5nIGRhdGEgY2hhbmdlcy5cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoR3JpZCwgW3tcbiAgICBrZXk6ICdyZWNvbXB1dGVHcmlkU2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY29tcHV0ZUdyaWRTaXplKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3Byb3BzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfcHJvcHMuc2Nyb2xsVG9Db2x1bW47XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3Byb3BzLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9wcm9wcy5zY3JvbGxUb1JvdztcblxuXG4gICAgICB0aGlzLl9zY3JvbGxiYXJTaXplID0gKDAsIF9zY3JvbGxiYXJTaXplMi5kZWZhdWx0KSgpO1xuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwIHx8IHNjcm9sbFRvcCA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHsgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb0NvbHVtbiA+PSAwIHx8IHNjcm9sbFRvUm93ID49IDApIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBvblJvd3NSZW5kZXJlZCBjYWxsYmFja1xuICAgICAgdGhpcy5faW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIoKTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSBvblNjcm9sbCBjYWxsYmFja1xuICAgICAgdGhpcy5faW52b2tlT25TY3JvbGxNZW1vaXplcih7XG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQgfHwgMCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfHwgMCxcbiAgICAgICAgdG90YWxDb2x1bW5zV2lkdGg6IHRoaXMuX2dldFRvdGFsQ29sdW1uc1dpZHRoKCksXG4gICAgICAgIHRvdGFsUm93c0hlaWdodDogdGhpcy5fZ2V0VG90YWxSb3dzSGVpZ2h0KClcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogVGhpcyBtZXRob2QgdXBkYXRlcyBzY3JvbGxMZWZ0L3Njcm9sbFRvcCBpbiBzdGF0ZSBmb3IgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAqIDEpIE5ldyBzY3JvbGwtdG8tY2VsbCBwcm9wcyBoYXZlIGJlZW4gc2V0XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wczIuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIGNvbHVtbldpZHRoID0gX3Byb3BzMi5jb2x1bW5XaWR0aDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMyLmhlaWdodDtcbiAgICAgIHZhciByb3dIZWlnaHQgPSBfcHJvcHMyLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMyLnJvd3NDb3VudDtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IF9wcm9wczIuc2Nyb2xsVG9Db2x1bW47XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBfcHJvcHMyLnNjcm9sbFRvUm93O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMi53aWR0aDtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9IF9zdGF0ZS5zY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUuc2Nyb2xsVG9wO1xuXG4gICAgICAvLyBNYWtlIHN1cmUgcmVxdWVzdGVkIGNoYW5nZXMgdG8gOnNjcm9sbExlZnQgb3IgOnNjcm9sbFRvcCBnZXQgYXBwbGllZC5cbiAgICAgIC8vIEFzc2lnbmluZyB0byBzY3JvbGxMZWZ0L3Njcm9sbFRvcCB0ZWxscyB0aGUgYnJvd3NlciB0byBpbnRlcnJ1cHQgYW55IHJ1bm5pbmcgc2Nyb2xsIGFuaW1hdGlvbnMsXG4gICAgICAvLyBBbmQgdG8gZGlzY2FyZCBhbnkgcGVuZGluZyBhc3luYyBjaGFuZ2VzIHRvIHRoZSBzY3JvbGwgcG9zaXRpb24gdGhhdCBtYXkgaGF2ZSBoYXBwZW5lZCBpbiB0aGUgbWVhbnRpbWUgKGUuZy4gb24gYSBzZXBhcmF0ZSBzY3JvbGxpbmcgdGhyZWFkKS5cbiAgICAgIC8vIFNvIHdlIG9ubHkgc2V0IHRoZXNlIHdoZW4gd2UgcmVxdWlyZSBhbiBhZGp1c3RtZW50IG9mIHRoZSBzY3JvbGwgcG9zaXRpb24uXG4gICAgICAvLyBTZWUgaXNzdWUgIzIgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cbiAgICAgIGlmIChzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9PT0gU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRCkge1xuICAgICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIHNjcm9sbExlZnQgIT09IHByZXZTdGF0ZS5zY3JvbGxMZWZ0ICYmIHNjcm9sbExlZnQgIT09IHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsTGVmdCkge1xuICAgICAgICAgIHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSAwICYmIHNjcm9sbFRvcCAhPT0gcHJldlN0YXRlLnNjcm9sbFRvcCAmJiBzY3JvbGxUb3AgIT09IHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgdGhpcy5yZWZzLnNjcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHNjcm9sbCBvZmZzZXRzIGlmIHRoZSBjdXJyZW50IDpzY3JvbGxUb0NvbHVtbiBvciA6c2Nyb2xsVG9Sb3cgdmFsdWVzIHJlcXVpcmVzIGl0XG4gICAgICAoMCwgX0dyaWRVdGlscy51cGRhdGVTY3JvbGxJbmRleEhlbHBlcikoe1xuICAgICAgICBjZWxsc0NvdW50OiBjb2x1bW5zQ291bnQsXG4gICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fY29sdW1uTWV0YWRhdGEsXG4gICAgICAgIGNlbGxTaXplOiBjb2x1bW5XaWR0aCxcbiAgICAgICAgcHJldmlvdXNDZWxsc0NvdW50OiBwcmV2UHJvcHMuY29sdW1uc0NvdW50LFxuICAgICAgICBwcmV2aW91c0NlbGxTaXplOiBwcmV2UHJvcHMuY29sdW1uV2lkdGgsXG4gICAgICAgIHByZXZpb3VzU2Nyb2xsVG9JbmRleDogcHJldlByb3BzLnNjcm9sbFRvQ29sdW1uLFxuICAgICAgICBwcmV2aW91c1NpemU6IHByZXZQcm9wcy53aWR0aCxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxUb0luZGV4OiBzY3JvbGxUb0NvbHVtbixcbiAgICAgICAgc2l6ZTogd2lkdGgsXG4gICAgICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2s6IHRoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtblxuICAgICAgfSk7XG4gICAgICAoMCwgX0dyaWRVdGlscy51cGRhdGVTY3JvbGxJbmRleEhlbHBlcikoe1xuICAgICAgICBjZWxsc0NvdW50OiByb3dzQ291bnQsXG4gICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fcm93TWV0YWRhdGEsXG4gICAgICAgIGNlbGxTaXplOiByb3dIZWlnaHQsXG4gICAgICAgIHByZXZpb3VzQ2VsbHNDb3VudDogcHJldlByb3BzLnJvd3NDb3VudCxcbiAgICAgICAgcHJldmlvdXNDZWxsU2l6ZTogcHJldlByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgcHJldmlvdXNTY3JvbGxUb0luZGV4OiBwcmV2UHJvcHMuc2Nyb2xsVG9Sb3csXG4gICAgICAgIHByZXZpb3VzU2l6ZTogcHJldlByb3BzLmhlaWdodCxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxUb3AsXG4gICAgICAgIHNjcm9sbFRvSW5kZXg6IHNjcm9sbFRvUm93LFxuICAgICAgICBzaXplOiBoZWlnaHQsXG4gICAgICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2s6IHRoaXMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93XG4gICAgICB9KTtcblxuICAgICAgLy8gVXBkYXRlIG9uUm93c1JlbmRlcmVkIGNhbGxiYWNrIGlmIHN0YXJ0L3N0b3AgaW5kaWNlcyBoYXZlIGNoYW5nZWRcbiAgICAgIHRoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgdGhpcy5fY29tcHV0ZUNvbHVtbk1ldGFkYXRhKHRoaXMucHJvcHMpO1xuICAgICAgdGhpcy5fY29tcHV0ZVJvd01ldGFkYXRhKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgX3JhZjIuZGVmYXVsdC5jYW5jZWwodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHNjcm9sbExlZnQvc2Nyb2xsVG9wIGluIHN0YXRlIGZvciB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAgICogMSkgRW1wdHkgY29udGVudCAoMCByb3dzIG9yIGNvbHVtbnMpXG4gICAgICogMikgTmV3IHNjcm9sbCBwcm9wcyBvdmVycmlkaW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICogMykgQ2VsbHMtY291bnQgb3IgY2VsbHMtc2l6ZSBoYXMgY2hhbmdlZCwgbWFraW5nIHByZXZpb3VzIHNjcm9sbCBvZmZzZXRzIGludmFsaWRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIGlmIChuZXh0UHJvcHMuY29sdW1uc0NvdW50ID09PSAwICYmIG5leHRTdGF0ZS5zY3JvbGxMZWZ0ICE9PSAwIHx8IG5leHRQcm9wcy5yb3dzQ291bnQgPT09IDAgJiYgbmV4dFN0YXRlLnNjcm9sbFRvcCAhPT0gMCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG5leHRQcm9wcy5zY3JvbGxMZWZ0ICE9PSB0aGlzLnByb3BzLnNjcm9sbExlZnQgfHwgbmV4dFByb3BzLnNjcm9sbFRvcCAhPT0gdGhpcy5wcm9wcy5zY3JvbGxUb3ApIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgIHNjcm9sbExlZnQ6IG5leHRQcm9wcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogbmV4dFByb3BzLnNjcm9sbFRvcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHNjcm9sbCBvZmZzZXRzIGlmIHRoZSBzaXplIG9yIG51bWJlciBvZiBjZWxscyBoYXZlIGNoYW5nZWQsIGludmFsaWRhdGluZyB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICAgICgwLCBfR3JpZFV0aWxzLmNvbXB1dGVDZWxsTWV0YWRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXRIZWxwZXIpKHtcbiAgICAgICAgY2VsbHNDb3VudDogdGhpcy5wcm9wcy5jb2x1bW5zQ291bnQsXG4gICAgICAgIGNlbGxTaXplOiB0aGlzLnByb3BzLmNvbHVtbldpZHRoLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFjazogdGhpcy5fY29tcHV0ZUNvbHVtbk1ldGFkYXRhLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzOiBuZXh0UHJvcHMsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZTogbmV4dFN0YXRlLmNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGUsXG4gICAgICAgIG5leHRDZWxsc0NvdW50OiBuZXh0UHJvcHMuY29sdW1uc0NvdW50LFxuICAgICAgICBuZXh0Q2VsbFNpemU6IG5leHRQcm9wcy5jb2x1bW5XaWR0aCxcbiAgICAgICAgbmV4dFNjcm9sbFRvSW5kZXg6IG5leHRQcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogdGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDogdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uXG4gICAgICB9KTtcbiAgICAgICgwLCBfR3JpZFV0aWxzLmNvbXB1dGVDZWxsTWV0YWRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXRIZWxwZXIpKHtcbiAgICAgICAgY2VsbHNDb3VudDogdGhpcy5wcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIGNlbGxTaXplOiB0aGlzLnByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2s6IHRoaXMuX2NvbXB1dGVSb3dNZXRhZGF0YSxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wczogbmV4dFByb3BzLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGU6IG5leHRTdGF0ZS5jb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlLFxuICAgICAgICBuZXh0Q2VsbHNDb3VudDogbmV4dFByb3BzLnJvd3NDb3VudCxcbiAgICAgICAgbmV4dENlbGxTaXplOiBuZXh0UHJvcHMucm93SGVpZ2h0LFxuICAgICAgICBuZXh0U2Nyb2xsVG9JbmRleDogbmV4dFByb3BzLnNjcm9sbFRvUm93LFxuICAgICAgICBzY3JvbGxUb0luZGV4OiB0aGlzLnByb3BzLnNjcm9sbFRvUm93LFxuICAgICAgICB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4OiB0aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1Jvd1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wczMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wczMuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczMuaGVpZ2h0O1xuICAgICAgdmFyIG5vQ29udGVudFJlbmRlcmVyID0gX3Byb3BzMy5ub0NvbnRlbnRSZW5kZXJlcjtcbiAgICAgIHZhciBvdmVyc2NhbkNvbHVtbnNDb3VudCA9IF9wcm9wczMub3ZlcnNjYW5Db2x1bW5zQ291bnQ7XG4gICAgICB2YXIgb3ZlcnNjYW5Sb3dzQ291bnQgPSBfcHJvcHMzLm92ZXJzY2FuUm93c0NvdW50O1xuICAgICAgdmFyIHJlbmRlckNlbGwgPSBfcHJvcHMzLnJlbmRlckNlbGw7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMy5yb3dzQ291bnQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMzLndpZHRoO1xuICAgICAgdmFyIF9zdGF0ZTIgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gX3N0YXRlMi5pc1Njcm9sbGluZztcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlMi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZTIuc2Nyb2xsVG9wO1xuXG5cbiAgICAgIHZhciBjaGlsZHJlblRvRGlzcGxheSA9IFtdO1xuXG4gICAgICAvLyBSZW5kZXIgb25seSBlbm91Z2ggY29sdW1ucyBhbmQgcm93cyB0byBjb3ZlciB0aGUgdmlzaWJsZSBhcmVhIG9mIHRoZSBncmlkLlxuICAgICAgaWYgKGhlaWdodCA+IDAgJiYgd2lkdGggPiAwKSB7XG4gICAgICAgIHZhciB2aXNpYmxlQ29sdW1uSW5kaWNlcyA9ICgwLCBfR3JpZFV0aWxzLmdldFZpc2libGVDZWxsSW5kaWNlcykoe1xuICAgICAgICAgIGNlbGxzQ291bnQ6IGNvbHVtbnNDb3VudCxcbiAgICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHdpZHRoLFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbExlZnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHZpc2libGVSb3dJbmRpY2VzID0gKDAsIF9HcmlkVXRpbHMuZ2V0VmlzaWJsZUNlbGxJbmRpY2VzKSh7XG4gICAgICAgICAgY2VsbHNDb3VudDogcm93c0NvdW50LFxuICAgICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fcm93TWV0YWRhdGEsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogaGVpZ2h0LFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbFRvcFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9yZSBmb3IgX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKClcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RvcDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RvcDtcblxuICAgICAgICB2YXIgb3ZlcnNjYW5Db2x1bW5JbmRpY2VzID0gKDAsIF9HcmlkVXRpbHMuZ2V0T3ZlcnNjYW5JbmRpY2VzKSh7XG4gICAgICAgICAgY2VsbHNDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ2VsbHNDb3VudDogb3ZlcnNjYW5Db2x1bW5zQ291bnQsXG4gICAgICAgICAgc3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIHN0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdG9wSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG92ZXJzY2FuUm93SW5kaWNlcyA9ICgwLCBfR3JpZFV0aWxzLmdldE92ZXJzY2FuSW5kaWNlcykoe1xuICAgICAgICAgIGNlbGxzQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNlbGxzQ291bnQ6IG92ZXJzY2FuUm93c0NvdW50LFxuICAgICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RhcnRJbmRleCxcbiAgICAgICAgICBzdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN0b3JlIGZvciBfaW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIoKVxuICAgICAgICB0aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gb3ZlcnNjYW5Db2x1bW5JbmRpY2VzLm92ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fY29sdW1uU3RvcEluZGV4ID0gb3ZlcnNjYW5Db2x1bW5JbmRpY2VzLm92ZXJzY2FuU3RvcEluZGV4O1xuICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gb3ZlcnNjYW5Sb3dJbmRpY2VzLm92ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fcm93U3RvcEluZGV4ID0gb3ZlcnNjYW5Sb3dJbmRpY2VzLm92ZXJzY2FuU3RvcEluZGV4O1xuXG4gICAgICAgIGZvciAodmFyIHJvd0luZGV4ID0gdGhpcy5fcm93U3RhcnRJbmRleDsgcm93SW5kZXggPD0gdGhpcy5fcm93U3RvcEluZGV4OyByb3dJbmRleCsrKSB7XG4gICAgICAgICAgdmFyIHJvd0RhdHVtID0gdGhpcy5fcm93TWV0YWRhdGFbcm93SW5kZXhdO1xuXG4gICAgICAgICAgZm9yICh2YXIgY29sdW1uSW5kZXggPSB0aGlzLl9jb2x1bW5TdGFydEluZGV4OyBjb2x1bW5JbmRleCA8PSB0aGlzLl9jb2x1bW5TdG9wSW5kZXg7IGNvbHVtbkluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBjb2x1bW5EYXR1bSA9IHRoaXMuX2NvbHVtbk1ldGFkYXRhW2NvbHVtbkluZGV4XTtcbiAgICAgICAgICAgIHZhciByZW5kZXJlZENlbGwgPSByZW5kZXJDZWxsKHsgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LCByb3dJbmRleDogcm93SW5kZXggfSk7XG4gICAgICAgICAgICB2YXIga2V5ID0gcm93SW5kZXggKyAnLScgKyBjb2x1bW5JbmRleDtcblxuICAgICAgICAgICAgLy8gYW55IG90aGVyIGZhbHNleSB2YWx1ZSB3aWxsIGJlIHJlbmRlcmVkXG4gICAgICAgICAgICAvLyBhcyBhIHRleHQgbm9kZSBieSBSZWFjdFxuICAgICAgICAgICAgaWYgKHJlbmRlcmVkQ2VsbCA9PSBudWxsIHx8IHJlbmRlcmVkQ2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjaGlsZCA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0dyaWRfX2NlbGwnLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IHJvd0RhdHVtLnNpemUsXG4gICAgICAgICAgICAgICAgICBsZWZ0OiBjb2x1bW5EYXR1bS5vZmZzZXQsXG4gICAgICAgICAgICAgICAgICB0b3A6IHJvd0RhdHVtLm9mZnNldCxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBjb2x1bW5EYXR1bS5zaXplXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZW5kZXJlZENlbGxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5LnB1c2goY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZ3JpZFN0eWxlID0ge1xuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICB9O1xuXG4gICAgICB2YXIgdG90YWxDb2x1bW5zV2lkdGggPSB0aGlzLl9nZXRUb3RhbENvbHVtbnNXaWR0aCgpO1xuICAgICAgdmFyIHRvdGFsUm93c0hlaWdodCA9IHRoaXMuX2dldFRvdGFsUm93c0hlaWdodCgpO1xuXG4gICAgICAvLyBGb3JjZSBicm93c2VyIHRvIGhpZGUgc2Nyb2xsYmFycyB3aGVuIHdlIGtub3cgdGhleSBhcmVuJ3QgbmVjZXNzYXJ5LlxuICAgICAgLy8gT3RoZXJ3aXNlIG9uY2Ugc2Nyb2xsYmFycyBhcHBlYXIgdGhleSBtYXkgbm90IGRpc2FwcGVhciBhZ2Fpbi5cbiAgICAgIC8vIEZvciBtb3JlIGluZm8gc2VlIGlzc3VlICMxMTZcbiAgICAgIGlmICh0b3RhbENvbHVtbnNXaWR0aCA8PSB3aWR0aCkge1xuICAgICAgICBncmlkU3R5bGUub3ZlcmZsb3dYID0gJ2hpZGRlbic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b3RhbFJvd3NIZWlnaHQgPD0gaGVpZ2h0KSB7XG4gICAgICAgIGdyaWRTdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogJ3Njcm9sbGluZ0NvbnRhaW5lcicsXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdHcmlkJywgY2xhc3NOYW1lKSxcbiAgICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgICAgdGFiSW5kZXg6IDAsXG4gICAgICAgICAgc3R5bGU6IGdyaWRTdHlsZVxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlblRvRGlzcGxheS5sZW5ndGggPiAwICYmIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0dyaWRfX2lubmVyU2Nyb2xsQ29udGFpbmVyJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHdpZHRoOiB0b3RhbENvbHVtbnNXaWR0aCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0b3RhbFJvd3NIZWlnaHQsXG4gICAgICAgICAgICAgIG1heFdpZHRoOiB0b3RhbENvbHVtbnNXaWR0aCxcbiAgICAgICAgICAgICAgbWF4SGVpZ2h0OiB0b3RhbFJvd3NIZWlnaHQsXG4gICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6IGlzU2Nyb2xsaW5nID8gJ25vbmUnIDogJ2F1dG8nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGlsZHJlblRvRGlzcGxheVxuICAgICAgICApLFxuICAgICAgICBjaGlsZHJlblRvRGlzcGxheS5sZW5ndGggPT09IDAgJiYgbm9Db250ZW50UmVuZGVyZXIoKVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEhlbHBlciBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2NvbXB1dGVDb2x1bW5NZXRhZGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jb21wdXRlQ29sdW1uTWV0YWRhdGEocHJvcHMpIHtcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBwcm9wcy5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgY29sdW1uV2lkdGggPSBwcm9wcy5jb2x1bW5XaWR0aDtcblxuXG4gICAgICB0aGlzLl9jb2x1bW5NZXRhZGF0YSA9ICgwLCBfR3JpZFV0aWxzLmluaXRDZWxsTWV0YWRhdGEpKHtcbiAgICAgICAgY2VsbHNDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICBzaXplOiBjb2x1bW5XaWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NvbXB1dGVSb3dNZXRhZGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jb21wdXRlUm93TWV0YWRhdGEocHJvcHMpIHtcbiAgICAgIHZhciByb3dIZWlnaHQgPSBwcm9wcy5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gcHJvcHMucm93c0NvdW50O1xuXG5cbiAgICAgIHRoaXMuX3Jvd01ldGFkYXRhID0gKDAsIF9HcmlkVXRpbHMuaW5pdENlbGxNZXRhZGF0YSkoe1xuICAgICAgICBjZWxsc0NvdW50OiByb3dzQ291bnQsXG4gICAgICAgIHNpemU6IHJvd0hlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiA6aXNTY3JvbGxpbmcgZmxhZyBmb3IgYSBzbWFsbCB3aW5kb3cgb2YgdGltZS5cbiAgICAgKiBUaGlzIGZsYWcgaXMgdXNlZCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIG9uIHRoZSBzY3JvbGxhYmxlIHBvcnRpb24gb2YgdGhlIEdyaWQuXG4gICAgICogVGhpcyBwcmV2ZW50cyBqZXJreS9zdHV0dGVyeSBtb3VzZS13aGVlbCBzY3JvbGxpbmcuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheSgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSwgSVNfU0NST0xMSU5HX1RJTUVPVVQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRUb3RhbENvbHVtbnNXaWR0aCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRUb3RhbENvbHVtbnNXaWR0aCgpIHtcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5NZXRhZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXR1bSA9IHRoaXMuX2NvbHVtbk1ldGFkYXRhW3RoaXMuX2NvbHVtbk1ldGFkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGRhdHVtLm9mZnNldCArIGRhdHVtLnNpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFRvdGFsUm93c0hlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRUb3RhbFJvd3NIZWlnaHQoKSB7XG4gICAgICBpZiAodGhpcy5fcm93TWV0YWRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0dW0gPSB0aGlzLl9yb3dNZXRhZGF0YVt0aGlzLl9yb3dNZXRhZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBkYXR1bS5vZmZzZXQgKyBkYXR1bS5zaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpIHtcbiAgICAgIHZhciBvblNlY3Rpb25SZW5kZXJlZCA9IHRoaXMucHJvcHMub25TZWN0aW9uUmVuZGVyZWQ7XG5cblxuICAgICAgdGhpcy5fb25HcmlkUmVuZGVyZWRNZW1vaXplcih7XG4gICAgICAgIGNhbGxiYWNrOiBvblNlY3Rpb25SZW5kZXJlZCxcbiAgICAgICAgaW5kaWNlczoge1xuICAgICAgICAgIGNvbHVtbk92ZXJzY2FuU3RhcnRJbmRleDogdGhpcy5fY29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBjb2x1bW5PdmVyc2NhblN0b3BJbmRleDogdGhpcy5fY29sdW1uU3RvcEluZGV4LFxuICAgICAgICAgIGNvbHVtblN0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBjb2x1bW5TdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4LFxuICAgICAgICAgIHJvd092ZXJzY2FuU3RhcnRJbmRleDogdGhpcy5fcm93U3RhcnRJbmRleCxcbiAgICAgICAgICByb3dPdmVyc2NhblN0b3BJbmRleDogdGhpcy5fcm93U3RvcEluZGV4LFxuICAgICAgICAgIHJvd1N0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RhcnRJbmRleCxcbiAgICAgICAgICByb3dTdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pbnZva2VPblNjcm9sbE1lbW9pemVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoX3JlZikge1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICB2YXIgdG90YWxDb2x1bW5zV2lkdGggPSBfcmVmLnRvdGFsQ29sdW1uc1dpZHRoO1xuICAgICAgdmFyIHRvdGFsUm93c0hlaWdodCA9IF9yZWYudG90YWxSb3dzSGVpZ2h0O1xuICAgICAgdmFyIF9wcm9wczQgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczQuaGVpZ2h0O1xuICAgICAgdmFyIG9uU2Nyb2xsID0gX3Byb3BzNC5vblNjcm9sbDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczQud2lkdGg7XG5cblxuICAgICAgdGhpcy5fb25TY3JvbGxNZW1vaXplcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayhfcmVmMikge1xuICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjIuc2Nyb2xsTGVmdDtcbiAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjIuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgb25TY3JvbGwoe1xuICAgICAgICAgICAgY2xpZW50SGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICBjbGllbnRXaWR0aDogd2lkdGgsXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICAgIHNjcm9sbFdpZHRoOiB0b3RhbENvbHVtbnNXaWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpbmRpY2VzOiB7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBzdGF0ZSBkdXJpbmcgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lLlxuICAgICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhdm9pZCBtdWx0aXBsZSByZW5kZXJzIGluIGEgc21hbGwgc3BhbiBvZiB0aW1lLlxuICAgICAqIFRoaXMgaGVscHMgcGVyZm9ybWFuY2UgZm9yIGJ1cnN0eSBldmVudHMgKGxpa2Ugb25TY3JvbGwpLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0TmV4dFN0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldE5leHRTdGF0ZShzdGF0ZSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgIF9yYWYyLmRlZmF1bHQuY2FuY2VsKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkID0gKDAsIF9yYWYyLmRlZmF1bHQpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkID0gbnVsbDtcbiAgICAgICAgX3RoaXMzLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRTY3JvbGxQb3NpdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRTY3JvbGxQb3NpdGlvbihfcmVmMykge1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmMy5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYzLnNjcm9sbFRvcDtcblxuICAgICAgdmFyIG5ld1N0YXRlID0ge1xuICAgICAgICBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjogU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRFxuICAgICAgfTtcblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCkge1xuICAgICAgICBuZXdTdGF0ZS5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbFRvcCA+PSAwKSB7XG4gICAgICAgIG5ld1N0YXRlLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLnN0YXRlLnNjcm9sbExlZnQgfHwgc2Nyb2xsVG9wID49IDAgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLnN0YXRlLnNjcm9sbFRvcCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbihzY3JvbGxUb0NvbHVtbk92ZXJyaWRlKSB7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBzY3JvbGxUb0NvbHVtbk92ZXJyaWRlICE9IG51bGwgPyBzY3JvbGxUb0NvbHVtbk92ZXJyaWRlIDogdGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbjtcblxuICAgICAgdmFyIHdpZHRoID0gdGhpcy5wcm9wcy53aWR0aDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gdGhpcy5zdGF0ZS5zY3JvbGxMZWZ0O1xuXG5cbiAgICAgIGlmIChzY3JvbGxUb0NvbHVtbiA+PSAwKSB7XG4gICAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsTGVmdCA9ICgwLCBfR3JpZFV0aWxzLmdldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCkoe1xuICAgICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fY29sdW1uTWV0YWRhdGEsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogd2lkdGgsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICB0YXJnZXRJbmRleDogc2Nyb2xsVG9Db2x1bW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbExlZnQgIT09IGNhbGN1bGF0ZWRTY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgICAgc2Nyb2xsTGVmdDogY2FsY3VsYXRlZFNjcm9sbExlZnRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdyhzY3JvbGxUb1Jvd092ZXJyaWRlKSB7XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxUb1Jvd092ZXJyaWRlICE9IG51bGwgPyBzY3JvbGxUb1Jvd092ZXJyaWRlIDogdGhpcy5wcm9wcy5zY3JvbGxUb1JvdztcblxuICAgICAgdmFyIGhlaWdodCA9IHRoaXMucHJvcHMuaGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IHRoaXMuc3RhdGUuc2Nyb2xsVG9wO1xuXG5cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA+PSAwKSB7XG4gICAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsVG9wID0gKDAsIF9HcmlkVXRpbHMuZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KSh7XG4gICAgICAgICAgY2VsbE1ldGFkYXRhOiB0aGlzLl9yb3dNZXRhZGF0YSxcbiAgICAgICAgICBjb250YWluZXJTaXplOiBoZWlnaHQsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsVG9wLFxuICAgICAgICAgIHRhcmdldEluZGV4OiBzY3JvbGxUb1Jvd1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2Nyb2xsVG9wICE9PSBjYWxjdWxhdGVkU2Nyb2xsVG9wKSB7XG4gICAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBjYWxjdWxhdGVkU2Nyb2xsVG9wXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoZXZlbnQpIHtcbiAgICAgIC8vIEluIGNlcnRhaW4gZWRnZS1jYXNlcyBSZWFjdCBkaXNwYXRjaGVzIGFuIG9uU2Nyb2xsIGV2ZW50IHdpdGggYW4gaW52YWxpZCB0YXJnZXQuc2Nyb2xsTGVmdCAvIHRhcmdldC5zY3JvbGxUb3AuXG4gICAgICAvLyBUaGlzIGludmFsaWQgZXZlbnQgY2FuIGJlIGRldGVjdGVkIGJ5IGNvbXBhcmluZyBldmVudC50YXJnZXQgdG8gdGhpcyBjb21wb25lbnQncyBzY3JvbGxhYmxlIERPTSBlbGVtZW50LlxuICAgICAgLy8gU2VlIGlzc3VlICM0MDQgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBwb2ludGVyIGV2ZW50cyBmcm9tIGludGVycnVwdGluZyBhIHNtb290aCBzY3JvbGxcbiAgICAgIHRoaXMuX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5KCk7XG5cbiAgICAgIC8vIFdoZW4gdGhpcyBjb21wb25lbnQgaXMgc2hydW5rIGRyYXN0aWNhbGx5LCBSZWFjdCBkaXNwYXRjaGVzIGEgc2VyaWVzIG9mIGJhY2stdG8tYmFjayBzY3JvbGwgZXZlbnRzLFxuICAgICAgLy8gR3JhZHVhbGx5IGNvbnZlcmdpbmcgb24gYSBzY3JvbGxUb3AgdGhhdCBpcyB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgbmV3LCBzbWFsbGVyIGhlaWdodC5cbiAgICAgIC8vIFRoaXMgY2F1c2VzIGEgc2VyaWVzIG9mIHJhcGlkIHJlbmRlcnMgdGhhdCBpcyBzbG93IGZvciBsb25nIGxpc3RzLlxuICAgICAgLy8gV2UgY2FuIGF2b2lkIHRoYXQgYnkgZG9pbmcgc29tZSBzaW1wbGUgYm91bmRzIGNoZWNraW5nIHRvIGVuc3VyZSB0aGF0IHNjcm9sbFRvcCBuZXZlciBleGNlZWRzIHRoZSB0b3RhbCBoZWlnaHQuXG4gICAgICB2YXIgX3Byb3BzNSA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNS5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHM1LndpZHRoO1xuXG4gICAgICB2YXIgc2Nyb2xsYmFyU2l6ZSA9IHRoaXMuX3Njcm9sbGJhclNpemU7XG4gICAgICB2YXIgdG90YWxSb3dzSGVpZ2h0ID0gdGhpcy5fZ2V0VG90YWxSb3dzSGVpZ2h0KCk7XG4gICAgICB2YXIgdG90YWxDb2x1bW5zV2lkdGggPSB0aGlzLl9nZXRUb3RhbENvbHVtbnNXaWR0aCgpO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBNYXRoLm1pbih0b3RhbENvbHVtbnNXaWR0aCAtIHdpZHRoICsgc2Nyb2xsYmFyU2l6ZSwgZXZlbnQudGFyZ2V0LnNjcm9sbExlZnQpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IE1hdGgubWluKHRvdGFsUm93c0hlaWdodCAtIGhlaWdodCArIHNjcm9sbGJhclNpemUsIGV2ZW50LnRhcmdldC5zY3JvbGxUb3ApO1xuXG4gICAgICAvLyBDZXJ0YWluIGRldmljZXMgKGxpa2UgQXBwbGUgdG91Y2hwYWQpIHJhcGlkLWZpcmUgZHVwbGljYXRlIGV2ZW50cy5cbiAgICAgIC8vIERvbid0IGZvcmNlIGEgcmUtcmVuZGVyIGlmIHRoaXMgaXMgdGhlIGNhc2UuXG4gICAgICAvLyBUaGUgbW91c2UgbWF5IG1vdmUgZmFzdGVyIHRoZW4gdGhlIGFuaW1hdGlvbiBmcmFtZSBkb2VzLlxuICAgICAgLy8gVXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0byBhdm9pZCBvdmVyLXVwZGF0aW5nLlxuICAgICAgaWYgKHRoaXMuc3RhdGUuc2Nyb2xsTGVmdCAhPT0gc2Nyb2xsTGVmdCB8fCB0aGlzLnN0YXRlLnNjcm9sbFRvcCAhPT0gc2Nyb2xsVG9wKSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIHdpdGggY2FuY2VsYWJsZSBzY3JvbGwgZXZlbnRzIChlZy4gRmlyZWZveCkgaW50ZXJydXB0IHNjcm9sbGluZyBhbmltYXRpb25zIGlmIHNjcm9sbFRvcC9zY3JvbGxMZWZ0IGlzIHNldC5cbiAgICAgICAgLy8gT3RoZXIgYnJvd3NlcnMgKGVnLiBTYWZhcmkpIGRvbid0IHNjcm9sbCBhcyB3ZWxsIHdpdGhvdXQgdGhlIGhlbHAgdW5kZXIgY2VydGFpbiBjb25kaXRpb25zIChET00gb3Igc3R5bGUgY2hhbmdlcyBkdXJpbmcgc2Nyb2xsaW5nKS5cbiAgICAgICAgLy8gQWxsIHRoaW5ncyBjb25zaWRlcmVkLCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBiZXN0IGN1cnJlbnQgd29yayBhcm91bmQgdGhhdCBJJ20gYXdhcmUgb2YuXG4gICAgICAgIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC9wdWxsLzEyNFxuICAgICAgICB2YXIgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPSBldmVudC5jYW5jZWxhYmxlID8gU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLk9CU0VSVkVEIDogU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRDtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXROZXh0U3RhdGUoe1xuICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb246IHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uLFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pbnZva2VPblNjcm9sbE1lbW9pemVyKHsgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsIHRvdGFsQ29sdW1uc1dpZHRoOiB0b3RhbENvbHVtbnNXaWR0aCwgdG90YWxSb3dzSGVpZ2h0OiB0b3RhbFJvd3NIZWlnaHQgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdyaWQ7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5HcmlkLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIE9wdGlvbmFsIGN1c3RvbSBDU1MgY2xhc3MgbmFtZSB0byBhdHRhY2ggdG8gcm9vdCBHcmlkIGVsZW1lbnQuXG4gICAqL1xuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgY29sdW1ucyBpbiBncmlkLlxuICAgKi9cbiAgY29sdW1uc0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCBjb2x1bW4gd2lkdGggKG51bWJlcikgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHdpZHRoIG9mIGEgY29sdW1uIGdpdmVuIGl0cyBpbmRleC5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIGNvbHVtbldpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEhlaWdodCBvZiBHcmlkOyB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG51bWJlciBvZiB2aXNpYmxlICh2cyB2aXJ0dWFsaXplZCkgcm93cy5cbiAgICovXG4gIGhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogT3B0aW9uYWwgcmVuZGVyZXIgdG8gYmUgdXNlZCBpbiBwbGFjZSBvZiByb3dzIHdoZW4gZWl0aGVyIDpyb3dzQ291bnQgb3IgOmNvbHVtbnNDb3VudCBpcyAwLlxuICAgKi9cbiAgbm9Db250ZW50UmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW5ldmVyIHRoZSBzY3JvbGwgb2Zmc2V0IGNoYW5nZXMgd2l0aGluIHRoZSBpbm5lciBzY3JvbGxhYmxlIHJlZ2lvbi5cbiAgICogVGhpcyBjYWxsYmFjayBjYW4gYmUgdXNlZCB0byBzeW5jIHNjcm9sbGluZyBiZXR3ZWVuIGxpc3RzLCB0YWJsZXMsIG9yIGdyaWRzLlxuICAgKiAoeyBjbGllbnRIZWlnaHQsIGNsaWVudFdpZHRoLCBzY3JvbGxIZWlnaHQsIHNjcm9sbExlZnQsIHNjcm9sbFRvcCwgc2Nyb2xsV2lkdGggfSk6IHZvaWRcbiAgICovXG4gIG9uU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzZWN0aW9uIG9mIHRoZSBHcmlkIHRoYXQgd2FzIGp1c3QgcmVuZGVyZWQuXG4gICAqICh7IGNvbHVtblN0YXJ0SW5kZXgsIGNvbHVtblN0b3BJbmRleCwgcm93U3RhcnRJbmRleCwgcm93U3RvcEluZGV4IH0pOiB2b2lkXG4gICAqL1xuICBvblNlY3Rpb25SZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBjb2x1bW5zIHRvIHJlbmRlciBiZWZvcmUvYWZ0ZXIgdGhlIHZpc2libGUgc2VjdGlvbiBvZiB0aGUgZ3JpZC5cbiAgICogVGhlc2UgY29sdW1ucyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMgb3IgYnJvd3NlcnMgdGhhdCBzZW5kIHNjcm9sbCBldmVudHMgaW5mcmVxdWVudGx5LlxuICAgKi9cbiAgb3ZlcnNjYW5Db2x1bW5zQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBzZWN0aW9uIG9mIHRoZSBncmlkLlxuICAgKiBUaGVzZSByb3dzIGNhbiBoZWxwIGZvciBzbW9vdGhlciBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcyBvciBicm93c2VycyB0aGF0IHNlbmQgc2Nyb2xsIGV2ZW50cyBpbmZyZXF1ZW50bHkuXG4gICAqL1xuICBvdmVyc2NhblJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNlbGwgZ2l2ZW4gYW4gcm93IGFuZCBjb2x1bW4gaW5kZXguXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6ICh7IGNvbHVtbkluZGV4OiBudW1iZXIsIHJvd0luZGV4OiBudW1iZXIgfSk6IFByb3BUeXBlcy5ub2RlXG4gICAqL1xuICByZW5kZXJDZWxsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgcm93IGhlaWdodCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIGEgcm93IGdpdmVuIGl0cyBpbmRleC5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyBpbiBncmlkLlxuICAgKi9cbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBIb3Jpem9udGFsIG9mZnNldC4gKi9cbiAgc2Nyb2xsTGVmdDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIENvbHVtbiBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KVxuICAgKi9cbiAgc2Nyb2xsVG9Db2x1bW46IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBWZXJ0aWNhbCBvZmZzZXQuICovXG4gIHNjcm9sbFRvcDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFJvdyBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KVxuICAgKi9cbiAgc2Nyb2xsVG9Sb3c6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiBHcmlkOyB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG51bWJlciBvZiB2aXNpYmxlICh2cyB2aXJ0dWFsaXplZCkgY29sdW1ucy5cbiAgICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuR3JpZC5kZWZhdWx0UHJvcHMgPSB7XG4gIG5vQ29udGVudFJlbmRlcmVyOiBmdW5jdGlvbiBub0NvbnRlbnRSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG92ZXJzY2FuQ29sdW1uc0NvdW50OiAwLFxuICBvdmVyc2NhblJvd3NDb3VudDogMTBcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBHcmlkOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY29tcHV0ZUNlbGxNZXRhZGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldEhlbHBlciA9IGNvbXB1dGVDZWxsTWV0YWRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXRIZWxwZXI7XG5leHBvcnRzLmNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIgPSBjcmVhdGVDYWxsYmFja01lbW9pemVyO1xuZXhwb3J0cy5maW5kTmVhcmVzdENlbGwgPSBmaW5kTmVhcmVzdENlbGw7XG5leHBvcnRzLmdldE92ZXJzY2FuSW5kaWNlcyA9IGdldE92ZXJzY2FuSW5kaWNlcztcbmV4cG9ydHMuZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4ID0gZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4O1xuZXhwb3J0cy5nZXRWaXNpYmxlQ2VsbEluZGljZXMgPSBnZXRWaXNpYmxlQ2VsbEluZGljZXM7XG5leHBvcnRzLmluaXRDZWxsTWV0YWRhdGEgPSBpbml0Q2VsbE1ldGFkYXRhO1xuZXhwb3J0cy51cGRhdGVTY3JvbGxJbmRleEhlbHBlciA9IHVwZGF0ZVNjcm9sbEluZGV4SGVscGVyO1xuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIHRoYXQgZGV0ZXJtaW5lcyB3aGVuIHRvIHJlY2FsY3VsYXRlIHJvdyBvciBjb2x1bW4gbWV0YWRhdGEuXG4gKlxuICogQHBhcmFtIGNlbGxzQ291bnQgTnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1ucyBpbiB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY2VsbHNTaXplIFdpZHRoIG9yIGhlaWdodCBvZiBjZWxscyBmb3IgdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrIE1ldGhvZCB0byBpbnZva2UgaWYgY2VsbCBtZXRhZGF0YSBzaG91bGQgYmUgcmVjYWxjdWxhdGVkXG4gKiBAcGFyYW0gY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcyBQYXJhbWV0ZXJzIHRvIHBhc3MgdG8gOmNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrXG4gKiBAcGFyYW0gY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlIEZsYWcgc3BlY2lmeWluZyB0aGF0IG1ldGFkYXRhIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqIEBwYXJhbSBuZXh0Q2VsbHNDb3VudCBOZXdseSB1cGRhdGVkIG51bWJlciBvZiByb3dzIG9yIGNvbHVtbnMgaW4gdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIG5leHRDZWxsc1NpemUgTmV3bHkgdXBkYXRlZCB3aWR0aCBvciBoZWlnaHQgb2YgY2VsbHMgZm9yIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBuZXh0U2Nyb2xsVG9JbmRleCBOZXdseSB1cGRhdGVkIHNjcm9sbC10by1pbmRleFxuICogQHBhcmFtIHNjcm9sbFRvSW5kZXggU2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCBDYWxsYmFjayB0byBpbnZva2UgaWYgdGhlIHNjcm9sbCBwb3NpdGlvbiBzaG91bGQgYmUgcmVjYWxjdWxhdGVkXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVDZWxsTWV0YWRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXRIZWxwZXIoX3JlZikge1xuICB2YXIgY2VsbHNDb3VudCA9IF9yZWYuY2VsbHNDb3VudDtcbiAgdmFyIGNlbGxTaXplID0gX3JlZi5jZWxsU2l6ZTtcbiAgdmFyIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrID0gX3JlZi5jb21wdXRlTWV0YWRhdGFDYWxsYmFjaztcbiAgdmFyIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHMgPSBfcmVmLmNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHM7XG4gIHZhciBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgPSBfcmVmLmNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZTtcbiAgdmFyIG5leHRDZWxsc0NvdW50ID0gX3JlZi5uZXh0Q2VsbHNDb3VudDtcbiAgdmFyIG5leHRDZWxsU2l6ZSA9IF9yZWYubmV4dENlbGxTaXplO1xuICB2YXIgbmV4dFNjcm9sbFRvSW5kZXggPSBfcmVmLm5leHRTY3JvbGxUb0luZGV4O1xuICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9yZWYuc2Nyb2xsVG9JbmRleDtcbiAgdmFyIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXggPSBfcmVmLnVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXg7XG5cbiAgLy8gRG9uJ3QgY29tcGFyZSBjZWxsIHNpemVzIGlmIHRoZXkgYXJlIGZ1bmN0aW9ucyBiZWNhdXNlIGlubGluZSBmdW5jdGlvbnMgd291bGQgY2F1c2UgaW5maW5pdGUgbG9vcHMuXG4gIC8vIEluIHRoYXQgZXZlbnQgdXNlcnMgc2hvdWxkIHVzZSB0aGUgbWFudWFsIHJlY29tcHV0ZSBtZXRob2RzIHRvIGluZm9ybSBvZiBjaGFuZ2VzLlxuICBpZiAoY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlIHx8IGNlbGxzQ291bnQgIT09IG5leHRDZWxsc0NvdW50IHx8ICh0eXBlb2YgY2VsbFNpemUgPT09ICdudW1iZXInIHx8IHR5cGVvZiBuZXh0Q2VsbFNpemUgPT09ICdudW1iZXInKSAmJiBjZWxsU2l6ZSAhPT0gbmV4dENlbGxTaXplKSB7XG4gICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2soY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcyk7XG5cbiAgICAvLyBVcGRhdGVkIGNlbGwgbWV0YWRhdGEgbWF5IGhhdmUgaGlkZGVuIHRoZSBwcmV2aW91cyBzY3JvbGxlZC10byBpdGVtLlxuICAgIC8vIEluIHRoaXMgY2FzZSB3ZSBzaG91bGQgYWxzbyB1cGRhdGUgdGhlIHNjcm9sbFRvcCB0byBlbnN1cmUgaXQgc3RheXMgdmlzaWJsZS5cbiAgICBpZiAoc2Nyb2xsVG9JbmRleCA+PSAwICYmIHNjcm9sbFRvSW5kZXggPT09IG5leHRTY3JvbGxUb0luZGV4KSB7XG4gICAgICB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSGVscGVyIHV0aWxpdHkgdGhhdCB1cGRhdGVzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgd2hlbmV2ZXIgYW55IG9mIHRoZSBzcGVjaWZpZWQgaW5kaWNlcyBoYXZlIGNoYW5nZWQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIoKSB7XG4gIHZhciByZXF1aXJlQWxsS2V5cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGNhY2hlZEluZGljZXMgPSB7fTtcblxuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gX3JlZjIuY2FsbGJhY2s7XG4gICAgdmFyIGluZGljZXMgPSBfcmVmMi5pbmRpY2VzO1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhpbmRpY2VzKTtcbiAgICB2YXIgYWxsSW5pdGlhbGl6ZWQgPSAhcmVxdWlyZUFsbEtleXMgfHwga2V5cy5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gaW5kaWNlc1trZXldID49IDA7XG4gICAgfSk7XG4gICAgdmFyIGluZGV4Q2hhbmdlZCA9IGtleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gY2FjaGVkSW5kaWNlc1trZXldICE9PSBpbmRpY2VzW2tleV07XG4gICAgfSk7XG5cbiAgICBjYWNoZWRJbmRpY2VzID0gaW5kaWNlcztcblxuICAgIGlmIChhbGxJbml0aWFsaXplZCAmJiBpbmRleENoYW5nZWQpIHtcbiAgICAgIGNhbGxiYWNrKGluZGljZXMpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBCaW5hcnkgc2VhcmNoIGZ1bmN0aW9uIGluc3BpcmVkIGJ5IHJlYWN0LWluZmluaXRlLlxuICovXG5mdW5jdGlvbiBmaW5kTmVhcmVzdENlbGwoX3JlZjMpIHtcbiAgdmFyIGNlbGxNZXRhZGF0YSA9IF9yZWYzLmNlbGxNZXRhZGF0YTtcbiAgdmFyIG1vZGUgPSBfcmVmMy5tb2RlO1xuICB2YXIgb2Zmc2V0ID0gX3JlZjMub2Zmc2V0O1xuXG4gIHZhciBoaWdoID0gY2VsbE1ldGFkYXRhLmxlbmd0aCAtIDE7XG4gIHZhciBsb3cgPSAwO1xuICB2YXIgbWlkZGxlID0gdW5kZWZpbmVkO1xuICB2YXIgY3VycmVudE9mZnNldCA9IHVuZGVmaW5lZDtcblxuICAvLyBUT0RPIEFkZCBiZXR0ZXIgZ3VhcmRzIGhlcmUgYWdhaW5zdCBOYU4gb2Zmc2V0XG5cbiAgd2hpbGUgKGxvdyA8PSBoaWdoKSB7XG4gICAgbWlkZGxlID0gbG93ICsgTWF0aC5mbG9vcigoaGlnaCAtIGxvdykgLyAyKTtcbiAgICBjdXJyZW50T2Zmc2V0ID0gY2VsbE1ldGFkYXRhW21pZGRsZV0ub2Zmc2V0O1xuXG4gICAgaWYgKGN1cnJlbnRPZmZzZXQgPT09IG9mZnNldCkge1xuICAgICAgcmV0dXJuIG1pZGRsZTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRPZmZzZXQgPCBvZmZzZXQpIHtcbiAgICAgIGxvdyA9IG1pZGRsZSArIDE7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50T2Zmc2V0ID4gb2Zmc2V0KSB7XG4gICAgICBoaWdoID0gbWlkZGxlIC0gMTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gZmluZE5lYXJlc3RDZWxsLkVRVUFMX09SX0xPV0VSICYmIGxvdyA+IDApIHtcbiAgICByZXR1cm4gbG93IC0gMTtcbiAgfSBlbHNlIGlmIChtb2RlID09PSBmaW5kTmVhcmVzdENlbGwuRVFVQUxfT1JfSElHSEVSICYmIGhpZ2ggPCBjZWxsTWV0YWRhdGEubGVuZ3RoIC0gMSkge1xuICAgIHJldHVybiBoaWdoICsgMTtcbiAgfVxufVxuXG5maW5kTmVhcmVzdENlbGwuRVFVQUxfT1JfTE9XRVIgPSAxO1xuZmluZE5lYXJlc3RDZWxsLkVRVUFMX09SX0hJR0hFUiA9IDI7XG5cbmZ1bmN0aW9uIGdldE92ZXJzY2FuSW5kaWNlcyhfcmVmNCkge1xuICB2YXIgY2VsbHNDb3VudCA9IF9yZWY0LmNlbGxzQ291bnQ7XG4gIHZhciBvdmVyc2NhbkNlbGxzQ291bnQgPSBfcmVmNC5vdmVyc2NhbkNlbGxzQ291bnQ7XG4gIHZhciBzdGFydEluZGV4ID0gX3JlZjQuc3RhcnRJbmRleDtcbiAgdmFyIHN0b3BJbmRleCA9IF9yZWY0LnN0b3BJbmRleDtcblxuICByZXR1cm4ge1xuICAgIG92ZXJzY2FuU3RhcnRJbmRleDogTWF0aC5tYXgoMCwgc3RhcnRJbmRleCAtIG92ZXJzY2FuQ2VsbHNDb3VudCksXG4gICAgb3ZlcnNjYW5TdG9wSW5kZXg6IE1hdGgubWluKGNlbGxzQ291bnQgLSAxLCBzdG9wSW5kZXggKyBvdmVyc2NhbkNlbGxzQ291bnQpXG4gIH07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBhIG5ldyBvZmZzZXQgdGhhdCBlbnN1cmVzIGEgY2VydGFpbiBjZWxsIGlzIHZpc2libGUsIGdpdmVuIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIElmIHRoZSBjZWxsIGlzIGFscmVhZHkgdmlzaWJsZSB0aGVuIHRoZSBjdXJyZW50IG9mZnNldCB3aWxsIGJlIHJldHVybmVkLlxuICogSWYgdGhlIGN1cnJlbnQgb2Zmc2V0IGlzIHRvbyBncmVhdCBvciBzbWFsbCwgaXQgd2lsbCBiZSBhZGp1c3RlZCBqdXN0IGVub3VnaCB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBpbmRleCBpcyB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSBjZWxsTWV0YWRhdGEgTWV0YWRhdGEgaW5pdGlhbGx5IGNvbXB1dGVkIGJ5IGluaXRDZWxsTWV0YWRhdGEoKVxuICogQHBhcmFtIGNvbnRhaW5lclNpemUgVG90YWwgc2l6ZSAod2lkdGggb3IgaGVpZ2h0KSBvZiB0aGUgY29udGFpbmVyXG4gKiBAcGFyYW0gY3VycmVudE9mZnNldCBDb250YWluZXIncyBjdXJyZW50ICh4IG9yIHkpIG9mZnNldFxuICogQHBhcmFtIHRhcmdldEluZGV4IEluZGV4IG9mIHRhcmdldCBjZWxsXG4gKiBAcmV0dXJuIE9mZnNldCB0byB1c2UgdG8gZW5zdXJlIHRoZSBzcGVjaWZpZWQgY2VsbCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFVwZGF0ZWRPZmZzZXRGb3JJbmRleChfcmVmNSkge1xuICB2YXIgY2VsbE1ldGFkYXRhID0gX3JlZjUuY2VsbE1ldGFkYXRhO1xuICB2YXIgY29udGFpbmVyU2l6ZSA9IF9yZWY1LmNvbnRhaW5lclNpemU7XG4gIHZhciBjdXJyZW50T2Zmc2V0ID0gX3JlZjUuY3VycmVudE9mZnNldDtcbiAgdmFyIHRhcmdldEluZGV4ID0gX3JlZjUudGFyZ2V0SW5kZXg7XG5cbiAgaWYgKGNlbGxNZXRhZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHRhcmdldEluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oY2VsbE1ldGFkYXRhLmxlbmd0aCAtIDEsIHRhcmdldEluZGV4KSk7XG5cbiAgdmFyIGRhdHVtID0gY2VsbE1ldGFkYXRhW3RhcmdldEluZGV4XTtcbiAgdmFyIG1heE9mZnNldCA9IGRhdHVtLm9mZnNldDtcbiAgdmFyIG1pbk9mZnNldCA9IG1heE9mZnNldCAtIGNvbnRhaW5lclNpemUgKyBkYXR1bS5zaXplO1xuICB2YXIgbmV3T2Zmc2V0ID0gTWF0aC5tYXgobWluT2Zmc2V0LCBNYXRoLm1pbihtYXhPZmZzZXQsIGN1cnJlbnRPZmZzZXQpKTtcblxuICByZXR1cm4gbmV3T2Zmc2V0O1xufVxuXG4vKipcbiAqIERldGVybWluZXMgdGhlIHJhbmdlIG9mIGNlbGxzIHRvIGRpc3BsYXkgZm9yIGEgZ2l2ZW4gb2Zmc2V0IGluIG9yZGVyIHRvIGZpbGwgdGhlIHNwZWNpZmllZCBjb250YWluZXIuXG4gKlxuICogQHBhcmFtIGNlbGxzQ291bnQgVG90YWwgbnVtYmVyIG9mIGNlbGxzLlxuICogQHBhcmFtIGNlbGxNZXRhZGF0YSBNZXRhZGF0YSBpbml0aWFsbHkgY29tcHV0ZWQgYnkgaW5pdENlbGxNZXRhZGF0YSgpXG4gKiBAcGFyYW0gY29udGFpbmVyU2l6ZSBUb3RhbCBzaXplICh3aWR0aCBvciBoZWlnaHQpIG9mIHRoZSBjb250YWluZXJcbiAqIEBwYXJhbSBjdXJyZW50T2Zmc2V0IENvbnRhaW5lcidzIGN1cnJlbnQgKHggb3IgeSkgb2Zmc2V0XG4gKiBAcmV0dXJuIEFuIG9iamVjdCBjb250YWluaW5nIDpzdGFydCBhbmQgOnN0b3AgYXR0cmlidXRlcywgZWFjaCBzcGVjaWZ5aW5nIGEgY2VsbCBpbmRleFxuICovXG5mdW5jdGlvbiBnZXRWaXNpYmxlQ2VsbEluZGljZXMoX3JlZjYpIHtcbiAgdmFyIGNlbGxzQ291bnQgPSBfcmVmNi5jZWxsc0NvdW50O1xuICB2YXIgY2VsbE1ldGFkYXRhID0gX3JlZjYuY2VsbE1ldGFkYXRhO1xuICB2YXIgY29udGFpbmVyU2l6ZSA9IF9yZWY2LmNvbnRhaW5lclNpemU7XG4gIHZhciBjdXJyZW50T2Zmc2V0ID0gX3JlZjYuY3VycmVudE9mZnNldDtcblxuICBpZiAoY2VsbHNDb3VudCA9PT0gMCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8vIFRPRE8gQWRkIGJldHRlciBndWFyZHMgaGVyZSBhZ2FpbnN0IE5hTiBvZmZzZXRcblxuICB2YXIgbGFzdERhdHVtID0gY2VsbE1ldGFkYXRhW2NlbGxNZXRhZGF0YS5sZW5ndGggLSAxXTtcbiAgdmFyIHRvdGFsQ2VsbFNpemUgPSBsYXN0RGF0dW0ub2Zmc2V0ICsgbGFzdERhdHVtLnNpemU7XG5cbiAgLy8gRW5zdXJlIG9mZnNldCBpcyB3aXRoaW4gcmVhc29uYWJsZSBib3VuZHNcbiAgY3VycmVudE9mZnNldCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRvdGFsQ2VsbFNpemUgLSBjb250YWluZXJTaXplLCBjdXJyZW50T2Zmc2V0KSk7XG5cbiAgdmFyIG1heE9mZnNldCA9IE1hdGgubWluKHRvdGFsQ2VsbFNpemUsIGN1cnJlbnRPZmZzZXQgKyBjb250YWluZXJTaXplKTtcblxuICB2YXIgc3RhcnQgPSBmaW5kTmVhcmVzdENlbGwoe1xuICAgIGNlbGxNZXRhZGF0YTogY2VsbE1ldGFkYXRhLFxuICAgIG1vZGU6IGZpbmROZWFyZXN0Q2VsbC5FUVVBTF9PUl9MT1dFUixcbiAgICBvZmZzZXQ6IGN1cnJlbnRPZmZzZXRcbiAgfSk7XG5cbiAgdmFyIGRhdHVtID0gY2VsbE1ldGFkYXRhW3N0YXJ0XTtcbiAgY3VycmVudE9mZnNldCA9IGRhdHVtLm9mZnNldCArIGRhdHVtLnNpemU7XG5cbiAgdmFyIHN0b3AgPSBzdGFydDtcblxuICB3aGlsZSAoY3VycmVudE9mZnNldCA8IG1heE9mZnNldCAmJiBzdG9wIDwgY2VsbHNDb3VudCAtIDEpIHtcbiAgICBzdG9wKys7XG5cbiAgICBjdXJyZW50T2Zmc2V0ICs9IGNlbGxNZXRhZGF0YVtzdG9wXS5zaXplO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgc3RvcDogc3RvcFxuICB9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIG1ldGFkYXRhIGZvciBhbiBheGlzIGFuZCBpdHMgY2VsbHMuXG4gKiBUaGlzIGRhdGEgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hpY2ggY2VsbHMgYXJlIHZpc2libGUgZ2l2ZW4gYSBjb250YWluZXIgc2l6ZSBhbmQgc2Nyb2xsIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSBjZWxsc0NvdW50IFRvdGFsIG51bWJlciBvZiBjZWxscy5cbiAqIEBwYXJhbSBzaXplIEVpdGhlciBhIGZpeGVkIHNpemUgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHNpemUgZm9yIGEgZ2l2ZW4gZ2l2ZW4gYW4gaW5kZXguXG4gKiBAcmV0dXJuIE9iamVjdCBtYXBwaW5nIGNlbGwgaW5kZXggdG8gY2VsbCBtZXRhZGF0YSAoc2l6ZSwgb2Zmc2V0KVxuICovXG5mdW5jdGlvbiBpbml0Q2VsbE1ldGFkYXRhKF9yZWY3KSB7XG4gIHZhciBjZWxsc0NvdW50ID0gX3JlZjcuY2VsbHNDb3VudDtcbiAgdmFyIHNpemUgPSBfcmVmNy5zaXplO1xuXG4gIHZhciBzaXplR2V0dGVyID0gc2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gc2l6ZSA6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiBzaXplO1xuICB9O1xuXG4gIHZhciBjZWxsTWV0YWRhdGEgPSBbXTtcbiAgdmFyIG9mZnNldCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcbiAgICB2YXIgX3NpemUgPSBzaXplR2V0dGVyKGkpO1xuXG4gICAgaWYgKF9zaXplID09IG51bGwgfHwgaXNOYU4oX3NpemUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBzaXplIHJldHVybmVkIGZvciBjZWxsICcgKyBpICsgJyBvZiB2YWx1ZSAnICsgX3NpemUpO1xuICAgIH1cblxuICAgIGNlbGxNZXRhZGF0YVtpXSA9IHtcbiAgICAgIHNpemU6IF9zaXplLFxuICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICB9O1xuXG4gICAgb2Zmc2V0ICs9IF9zaXplO1xuICB9XG5cbiAgcmV0dXJuIGNlbGxNZXRhZGF0YTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZW4gdG8gdXBkYXRlIHNjcm9sbCBvZmZzZXRzIHRvIGVuc3VyZSB0aGF0IGEgc2Nyb2xsLXRvLWluZGV4IHJlbWFpbnMgdmlzaWJsZS5cbiAqXG4gKiBAcGFyYW0gY2VsbE1ldGFkYXRhIE1ldGFkYXRhIGluaXRpYWxseSBjb21wdXRlZCBieSBpbml0Q2VsbE1ldGFkYXRhKClcbiAqIEBwYXJhbSBjZWxsc0NvdW50IE51bWJlciBvZiByb3dzIG9yIGNvbHVtbnMgaW4gdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIGNlbGxzU2l6ZSBXaWR0aCBvciBoZWlnaHQgb2YgY2VsbHMgZm9yIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBwcmV2aW91c0NlbGxzQ291bnQgUHJldmlvdXMgbnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1uc1xuICogQHBhcmFtIHByZXZpb3VzQ2VsbHNTaXplIFByZXZpb3VzIHdpZHRoIG9yIGhlaWdodCBvZiBjZWxsc1xuICogQHBhcmFtIHByZXZpb3VzU2Nyb2xsVG9JbmRleCBQcmV2aW91cyBzY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSBwcmV2aW91c1NpemUgUHJldmlvdXMgd2lkdGggb3IgaGVpZ2h0IG9mIHRoZSB2aXJ0dWFsaXplZCBjb250YWluZXJcbiAqIEBwYXJhbSBzY3JvbGxPZmZzZXQgQ3VycmVudCBzY3JvbGxMZWZ0IG9yIHNjcm9sbFRvcFxuICogQHBhcmFtIHNjcm9sbFRvSW5kZXggU2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gc2l6ZSBXaWR0aCBvciBoZWlnaHQgb2YgdGhlIHZpcnR1YWxpemVkIGNvbnRhaW5lclxuICogQHBhcmFtIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggYW4gb3B0aW9uYWwgc2Nyb2xsLXRvLWluZGV4IG92ZXJyaWRlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEluZGV4SGVscGVyKF9yZWY4KSB7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmOC5jZWxsTWV0YWRhdGE7XG4gIHZhciBjZWxsc0NvdW50ID0gX3JlZjguY2VsbHNDb3VudDtcbiAgdmFyIGNlbGxTaXplID0gX3JlZjguY2VsbFNpemU7XG4gIHZhciBwcmV2aW91c0NlbGxzQ291bnQgPSBfcmVmOC5wcmV2aW91c0NlbGxzQ291bnQ7XG4gIHZhciBwcmV2aW91c0NlbGxTaXplID0gX3JlZjgucHJldmlvdXNDZWxsU2l6ZTtcbiAgdmFyIHByZXZpb3VzU2Nyb2xsVG9JbmRleCA9IF9yZWY4LnByZXZpb3VzU2Nyb2xsVG9JbmRleDtcbiAgdmFyIHByZXZpb3VzU2l6ZSA9IF9yZWY4LnByZXZpb3VzU2l6ZTtcbiAgdmFyIHNjcm9sbE9mZnNldCA9IF9yZWY4LnNjcm9sbE9mZnNldDtcbiAgdmFyIHNjcm9sbFRvSW5kZXggPSBfcmVmOC5zY3JvbGxUb0luZGV4O1xuICB2YXIgc2l6ZSA9IF9yZWY4LnNpemU7XG4gIHZhciB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrID0gX3JlZjgudXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjaztcblxuICB2YXIgaGFzU2Nyb2xsVG9JbmRleCA9IHNjcm9sbFRvSW5kZXggPj0gMCAmJiBzY3JvbGxUb0luZGV4IDwgY2VsbHNDb3VudDtcbiAgdmFyIHNpemVIYXNDaGFuZ2VkID0gc2l6ZSAhPT0gcHJldmlvdXNTaXplIHx8ICFwcmV2aW91c0NlbGxTaXplIHx8IHR5cGVvZiBjZWxsU2l6ZSA9PT0gJ251bWJlcicgJiYgY2VsbFNpemUgIT09IHByZXZpb3VzQ2VsbFNpemU7XG5cbiAgLy8gSWYgd2UgaGF2ZSBhIG5ldyBzY3JvbGwgdGFyZ2V0IE9SIGlmIGhlaWdodC9yb3ctaGVpZ2h0IGhhcyBjaGFuZ2VkLFxuICAvLyBXZSBzaG91bGQgZW5zdXJlIHRoYXQgdGhlIHNjcm9sbCB0YXJnZXQgaXMgdmlzaWJsZS5cbiAgaWYgKGhhc1Njcm9sbFRvSW5kZXggJiYgKHNpemVIYXNDaGFuZ2VkIHx8IHNjcm9sbFRvSW5kZXggIT09IHByZXZpb3VzU2Nyb2xsVG9JbmRleCkpIHtcbiAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrKCk7XG5cbiAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgc2VsZWN0ZWQgaXRlbSBidXQgbGlzdCBzaXplIG9yIG51bWJlciBvZiBjaGlsZHJlbiBoYXZlIGRlY3JlYXNlZCxcbiAgICAvLyBNYWtlIHN1cmUgd2UgYXJlbid0IHNjcm9sbGVkIHRvbyBmYXIgcGFzdCB0aGUgY3VycmVudCBjb250ZW50LlxuICB9IGVsc2UgaWYgKCFoYXNTY3JvbGxUb0luZGV4ICYmIChzaXplIDwgcHJldmlvdXNTaXplIHx8IGNlbGxzQ291bnQgPCBwcmV2aW91c0NlbGxzQ291bnQpKSB7XG4gICAgICB2YXIgY2FsY3VsYXRlZFNjcm9sbE9mZnNldCA9IGdldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCh7XG4gICAgICAgIGNlbGxNZXRhZGF0YTogY2VsbE1ldGFkYXRhLFxuICAgICAgICBjb250YWluZXJTaXplOiBzaXplLFxuICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxPZmZzZXQsXG4gICAgICAgIHRhcmdldEluZGV4OiBjZWxsc0NvdW50IC0gMVxuICAgICAgfSk7XG5cbiAgICAgIC8vIE9ubHkgYWRqdXN0IHRoZSBzY3JvbGwgcG9zaXRpb24gaWYgd2UndmUgc2Nyb2xsZWQgYmVsb3cgdGhlIGxhc3Qgc2V0IG9mIHJvd3MuXG4gICAgICBpZiAoY2FsY3VsYXRlZFNjcm9sbE9mZnNldCA8IHNjcm9sbE9mZnNldCkge1xuICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrKGNlbGxzQ291bnQgLSAxKTtcbiAgICAgIH1cbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5HcmlkID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0dyaWQyID0gcmVxdWlyZSgnLi9HcmlkJyk7XG5cbnZhciBfR3JpZDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HcmlkMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9HcmlkMy5kZWZhdWx0O1xuZXhwb3J0cy5HcmlkID0gX0dyaWQzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5leHBvcnRzLmlzUmFuZ2VWaXNpYmxlID0gaXNSYW5nZVZpc2libGU7XG5leHBvcnRzLnNjYW5Gb3JVbmxvYWRlZFJhbmdlcyA9IHNjYW5Gb3JVbmxvYWRlZFJhbmdlcztcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0aGF0IG1hbmFnZXMgbGF6eS1sb2FkaW5nIGZvciBcImluZmluaXRlXCIgZGF0YS5cbiAqIFRoaXMgY29tcG9uZW50IGRlY29yYXRlcyBhIHZpcnR1YWwgY29tcG9uZW50IGFuZCBqdXN0LWluLXRpbWUgcHJlZmV0Y2hlcyByb3dzIGFzIGEgdXNlciBzY3JvbGxzLlxuICogSXQgaXMgaW50ZW5kZWQgYXMgYSBjb252ZW5pZW5jZSBjb21wb25lbnQ7IGZvcmsgaXQgaWYgeW91J2QgbGlrZSBmaW5lci1ncmFpbmVkIGNvbnRyb2wgb3ZlciBkYXRhLWxvYWRpbmcuXG4gKi9cblxudmFyIEluZmluaXRlTG9hZGVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEluZmluaXRlTG9hZGVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBJbmZpbml0ZUxvYWRlcihwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbmZpbml0ZUxvYWRlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW5maW5pdGVMb2FkZXIpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLl9vblJvd3NSZW5kZXJlZCA9IF90aGlzLl9vblJvd3NSZW5kZXJlZC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fcmVnaXN0ZXJDaGlsZCA9IF90aGlzLl9yZWdpc3RlckNoaWxkLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhJbmZpbml0ZUxvYWRlciwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXG5cbiAgICAgIHJldHVybiBjaGlsZHJlbih7XG4gICAgICAgIG9uUm93c1JlbmRlcmVkOiB0aGlzLl9vblJvd3NSZW5kZXJlZCxcbiAgICAgICAgcmVnaXN0ZXJDaGlsZDogdGhpcy5fcmVnaXN0ZXJDaGlsZFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uUm93c1JlbmRlcmVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uUm93c1JlbmRlcmVkKF9yZWYpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgc3RhcnRJbmRleCA9IF9yZWYuc3RhcnRJbmRleDtcbiAgICAgIHZhciBzdG9wSW5kZXggPSBfcmVmLnN0b3BJbmRleDtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGlzUm93TG9hZGVkID0gX3Byb3BzLmlzUm93TG9hZGVkO1xuICAgICAgdmFyIGxvYWRNb3JlUm93cyA9IF9wcm9wcy5sb2FkTW9yZVJvd3M7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzLnJvd3NDb3VudDtcbiAgICAgIHZhciB0aHJlc2hvbGQgPSBfcHJvcHMudGhyZXNob2xkO1xuXG5cbiAgICAgIHRoaXMuX2xhc3RSZW5kZXJlZFN0YXJ0SW5kZXggPSBzdGFydEluZGV4O1xuICAgICAgdGhpcy5fbGFzdFJlbmRlcmVkU3RvcEluZGV4ID0gc3RvcEluZGV4O1xuXG4gICAgICB2YXIgdW5sb2FkZWRSYW5nZXMgPSBzY2FuRm9yVW5sb2FkZWRSYW5nZXMoe1xuICAgICAgICBpc1Jvd0xvYWRlZDogaXNSb3dMb2FkZWQsXG4gICAgICAgIHN0YXJ0SW5kZXg6IE1hdGgubWF4KDAsIHN0YXJ0SW5kZXggLSB0aHJlc2hvbGQpLFxuICAgICAgICBzdG9wSW5kZXg6IE1hdGgubWluKHJvd3NDb3VudCwgc3RvcEluZGV4ICsgdGhyZXNob2xkKVxuICAgICAgfSk7XG5cbiAgICAgIHVubG9hZGVkUmFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKHVubG9hZGVkUmFuZ2UpIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSBsb2FkTW9yZVJvd3ModW5sb2FkZWRSYW5nZSk7XG4gICAgICAgIGlmIChwcm9taXNlKSB7XG4gICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIHZpc2libGUgcm93cyBpZiBhbnkgb2YgdGhlbSBoYXZlIGp1c3QgYmVlbiBsb2FkZWQuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgdGhleSB3aWxsIHJlbWFpbiBpbiB0aGVpciB1bmxvYWRlZCB2aXN1YWwgc3RhdGUuXG4gICAgICAgICAgICBpZiAoaXNSYW5nZVZpc2libGUoe1xuICAgICAgICAgICAgICBsYXN0UmVuZGVyZWRTdGFydEluZGV4OiBfdGhpczIuX2xhc3RSZW5kZXJlZFN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIGxhc3RSZW5kZXJlZFN0b3BJbmRleDogX3RoaXMyLl9sYXN0UmVuZGVyZWRTdG9wSW5kZXgsXG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXg6IHVubG9hZGVkUmFuZ2Uuc3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgc3RvcEluZGV4OiB1bmxvYWRlZFJhbmdlLnN0b3BJbmRleFxuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzMi5fcmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMyLl9yZWdpc3RlcmVkQ2hpbGQuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVnaXN0ZXJDaGlsZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZWdpc3RlckNoaWxkKHJlZ2lzdGVyZWRDaGlsZCkge1xuICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkID0gcmVnaXN0ZXJlZENoaWxkO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBJbmZpbml0ZUxvYWRlcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgc3BlY2lmaWVkIHN0YXJ0L3N0b3AgcmFuZ2UgaXMgdmlzaWJsZSBiYXNlZCBvbiB0aGUgbW9zdCByZWNlbnRseSByZW5kZXJlZCByYW5nZS5cbiAqL1xuXG5cbkluZmluaXRlTG9hZGVyLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgYSB2aXJ0dWFsaXplZCBjb21wb25lbnQuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgb25Sb3dzUmVuZGVyZWQsIHJlZ2lzdGVyQ2hpbGQgfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICpcbiAgICogVGhlIHNwZWNpZmllZCA6b25Sb3dzUmVuZGVyZWQgZnVuY3Rpb24gc2hvdWxkIGJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBjaGlsZCdzIDpvblJvd3NSZW5kZXJlZCBwcm9wZXJ0eS5cbiAgICogVGhlIDpyZWdpc3RlckNoaWxkIGNhbGxiYWNrIHNob3VsZCBiZSBzZXQgYXMgdGhlIHZpcnR1YWxpemVkIGNvbXBvbmVudCdzIDpyZWYuXG4gICAqL1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciB0cmFja2luZyB0aGUgbG9hZGVkIHN0YXRlIG9mIGVhY2ggcm93LlxuICAgKiBJdCBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOiAoaW5kZXg6IG51bWJlcik6IGJvb2xlYW5cbiAgICovXG4gIGlzUm93TG9hZGVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIG1vcmUgcm93cyBtdXN0IGJlIGxvYWRlZC5cbiAgICogSXQgc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTogKHsgc3RhcnRJbmRleCwgc3RvcEluZGV4IH0pOiBQcm9taXNlXG4gICAqIFRoZSByZXR1cm5lZCBQcm9taXNlIHNob3VsZCBiZSByZXNvbHZlZCBvbmNlIHJvdyBkYXRhIGhhcyBmaW5pc2hlZCBsb2FkaW5nLlxuICAgKiBJdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZW4gdG8gcmVmcmVzaCB0aGUgbGlzdCB3aXRoIHRoZSBuZXdseS1sb2FkZWQgZGF0YS5cbiAgICogVGhpcyBjYWxsYmFjayBtYXkgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIHJlYWN0aW9uIHRvIGEgc2luZ2xlIHNjcm9sbCBldmVudC5cbiAgICovXG4gIGxvYWRNb3JlUm93czogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIGluIGxpc3Q7IGNhbiBiZSBhcmJpdHJhcnkgaGlnaCBudW1iZXIgaWYgYWN0dWFsIG51bWJlciBpcyB1bmtub3duLlxuICAgKi9cbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBUaHJlc2hvbGQgYXQgd2hpY2ggdG8gcHJlLWZldGNoIGRhdGEuXG4gICAqIEEgdGhyZXNob2xkIFggbWVhbnMgdGhhdCBkYXRhIHdpbGwgc3RhcnQgbG9hZGluZyB3aGVuIGEgdXNlciBzY3JvbGxzIHdpdGhpbiBYIHJvd3MuXG4gICAqIFRoaXMgdmFsdWUgZGVmYXVsdHMgdG8gMTUuXG4gICAqL1xuICB0aHJlc2hvbGQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5JbmZpbml0ZUxvYWRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIHJvd3NDb3VudDogMCxcbiAgdGhyZXNob2xkOiAxNVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEluZmluaXRlTG9hZGVyO1xuZnVuY3Rpb24gaXNSYW5nZVZpc2libGUoX3JlZjIpIHtcbiAgdmFyIGxhc3RSZW5kZXJlZFN0YXJ0SW5kZXggPSBfcmVmMi5sYXN0UmVuZGVyZWRTdGFydEluZGV4O1xuICB2YXIgbGFzdFJlbmRlcmVkU3RvcEluZGV4ID0gX3JlZjIubGFzdFJlbmRlcmVkU3RvcEluZGV4O1xuICB2YXIgc3RhcnRJbmRleCA9IF9yZWYyLnN0YXJ0SW5kZXg7XG4gIHZhciBzdG9wSW5kZXggPSBfcmVmMi5zdG9wSW5kZXg7XG5cbiAgcmV0dXJuICEoc3RhcnRJbmRleCA+IGxhc3RSZW5kZXJlZFN0b3BJbmRleCB8fCBzdG9wSW5kZXggPCBsYXN0UmVuZGVyZWRTdGFydEluZGV4KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBvZiB0aGUgcmFuZ2VzIHdpdGhpbiBhIGxhcmdlciByYW5nZSB0aGF0IGNvbnRhaW4gdW5sb2FkZWQgcm93cy5cbiAqL1xuZnVuY3Rpb24gc2NhbkZvclVubG9hZGVkUmFuZ2VzKF9yZWYzKSB7XG4gIHZhciBpc1Jvd0xvYWRlZCA9IF9yZWYzLmlzUm93TG9hZGVkO1xuICB2YXIgc3RhcnRJbmRleCA9IF9yZWYzLnN0YXJ0SW5kZXg7XG4gIHZhciBzdG9wSW5kZXggPSBfcmVmMy5zdG9wSW5kZXg7XG5cbiAgdmFyIHVubG9hZGVkUmFuZ2VzID0gW107XG4gIHZhciByYW5nZVN0YXJ0SW5kZXggPSBudWxsO1xuICB2YXIgcmFuZ2VTdG9wSW5kZXggPSBudWxsO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpIDw9IHN0b3BJbmRleDsgaSsrKSB7XG4gICAgdmFyIGxvYWRlZCA9IGlzUm93TG9hZGVkKGkpO1xuXG4gICAgaWYgKCFsb2FkZWQpIHtcbiAgICAgIHJhbmdlU3RvcEluZGV4ID0gaTtcbiAgICAgIGlmIChyYW5nZVN0YXJ0SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgcmFuZ2VTdGFydEluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJhbmdlU3RvcEluZGV4ICE9PSBudWxsKSB7XG4gICAgICB1bmxvYWRlZFJhbmdlcy5wdXNoKHtcbiAgICAgICAgc3RhcnRJbmRleDogcmFuZ2VTdGFydEluZGV4LFxuICAgICAgICBzdG9wSW5kZXg6IHJhbmdlU3RvcEluZGV4XG4gICAgICB9KTtcblxuICAgICAgcmFuZ2VTdGFydEluZGV4ID0gcmFuZ2VTdG9wSW5kZXggPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZVN0b3BJbmRleCAhPT0gbnVsbCkge1xuICAgIHVubG9hZGVkUmFuZ2VzLnB1c2goe1xuICAgICAgc3RhcnRJbmRleDogcmFuZ2VTdGFydEluZGV4LFxuICAgICAgc3RvcEluZGV4OiByYW5nZVN0b3BJbmRleFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHVubG9hZGVkUmFuZ2VzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSW5maW5pdGVMb2FkZXIgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfSW5maW5pdGVMb2FkZXIyID0gcmVxdWlyZSgnLi9JbmZpbml0ZUxvYWRlcicpO1xuXG52YXIgX0luZmluaXRlTG9hZGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0luZmluaXRlTG9hZGVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9JbmZpbml0ZUxvYWRlcjMuZGVmYXVsdDtcbmV4cG9ydHMuSW5maW5pdGVMb2FkZXIgPSBfSW5maW5pdGVMb2FkZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBIT0MgdGhhdCBzaW1wbGlmaWVzIHRoZSBwcm9jZXNzIG9mIHN5bmNocm9uaXppbmcgc2Nyb2xsaW5nIGJldHdlZW4gdHdvIG9yIG1vcmUgdmlydHVhbGl6ZWQgY29tcG9uZW50cy5cbiAqL1xuXG52YXIgU2Nyb2xsU3luYyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhTY3JvbGxTeW5jLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTY3JvbGxTeW5jKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNjcm9sbFN5bmMpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNjcm9sbFN5bmMpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgY2xpZW50SGVpZ2h0OiAwLFxuICAgICAgY2xpZW50V2lkdGg6IDAsXG4gICAgICBzY3JvbGxIZWlnaHQ6IDAsXG4gICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgc2Nyb2xsV2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX29uU2Nyb2xsID0gX3RoaXMuX29uU2Nyb2xsLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTY3JvbGxTeW5jLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfc3RhdGUuY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIGNsaWVudFdpZHRoID0gX3N0YXRlLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9zdGF0ZS5zY3JvbGxIZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZS5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZS5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsV2lkdGggPSBfc3RhdGUuc2Nyb2xsV2lkdGg7XG5cblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsXG4gICAgICAgIGNsaWVudFdpZHRoOiBjbGllbnRXaWR0aCxcbiAgICAgICAgb25TY3JvbGw6IHRoaXMuX29uU2Nyb2xsLFxuICAgICAgICBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCxcbiAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgIHNjcm9sbFdpZHRoOiBzY3JvbGxXaWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKF9yZWYpIHtcbiAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfcmVmLmNsaWVudEhlaWdodDtcbiAgICAgIHZhciBjbGllbnRXaWR0aCA9IF9yZWYuY2xpZW50V2lkdGg7XG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gX3JlZi5zY3JvbGxIZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxXaWR0aCA9IF9yZWYuc2Nyb2xsV2lkdGg7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjbGllbnRIZWlnaHQ6IGNsaWVudEhlaWdodCwgY2xpZW50V2lkdGg6IGNsaWVudFdpZHRoLCBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCwgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsIHNjcm9sbFdpZHRoOiBzY3JvbGxXaWR0aCB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2Nyb2xsU3luYztcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblNjcm9sbFN5bmMucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyAyIG9yIG1vcmUgdmlydHVhbGl6ZWQgY29tcG9uZW50cy5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgKiAoeyBvblNjcm9sbCwgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqL1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JvbGxTeW5jOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU2Nyb2xsU3luYyA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9TY3JvbGxTeW5jMiA9IHJlcXVpcmUoJy4vU2Nyb2xsU3luYycpO1xuXG52YXIgX1Njcm9sbFN5bmMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Nyb2xsU3luYzIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfU2Nyb2xsU3luYzMuZGVmYXVsdDtcbmV4cG9ydHMuU2Nyb2xsU3luYyA9IF9TY3JvbGxTeW5jMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9HcmlkID0gcmVxdWlyZSgnLi4vR3JpZCcpO1xuXG52YXIgX0dyaWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSXQgaXMgaW5lZmZpY2llbnQgdG8gY3JlYXRlIGFuZCBtYW5hZ2UgYSBsYXJnZSBsaXN0IG9mIERPTSBlbGVtZW50cyB3aXRoaW4gYSBzY3JvbGxpbmcgY29udGFpbmVyXG4gKiBpZiBvbmx5IGEgZmV3IG9mIHRob3NlIGVsZW1lbnRzIGFyZSB2aXNpYmxlLiBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIHRoaXMgY29tcG9uZW50IGlzIHRvIGltcHJvdmVcbiAqIHBlcmZvcm1hbmNlIGJ5IG9ubHkgcmVuZGVyaW5nIHRoZSBET00gbm9kZXMgdGhhdCBhIHVzZXIgaXMgYWJsZSB0byBzZWUgYmFzZWQgb24gdGhlaXIgY3VycmVudFxuICogc2Nyb2xsIHBvc2l0aW9uLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IHJlbmRlcnMgYSB2aXJ0dWFsaXplZCBsaXN0IG9mIGVsZW1lbnRzIHdpdGggZWl0aGVyIGZpeGVkIG9yIGR5bmFtaWMgaGVpZ2h0cy5cbiAqL1xuXG52YXIgVmlydHVhbFNjcm9sbCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhWaXJ0dWFsU2Nyb2xsLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBWaXJ0dWFsU2Nyb2xsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWaXJ0dWFsU2Nyb2xsKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVmlydHVhbFNjcm9sbCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVmlydHVhbFNjcm9sbCwgW3tcbiAgICBrZXk6ICdyZWNvbXB1dGVSb3dIZWlnaHRzJyxcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEdyaWQjcmVjb21wdXRlR3JpZFNpemVcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlUm93SGVpZ2h0cygpIHtcbiAgICAgIHRoaXMucmVmcy5HcmlkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMuaGVpZ2h0O1xuICAgICAgdmFyIG5vUm93c1JlbmRlcmVyID0gX3Byb3BzLm5vUm93c1JlbmRlcmVyO1xuICAgICAgdmFyIG9uUm93c1JlbmRlcmVkID0gX3Byb3BzLm9uUm93c1JlbmRlcmVkO1xuICAgICAgdmFyIF9vblNjcm9sbCA9IF9wcm9wcy5vblNjcm9sbDtcbiAgICAgIHZhciByb3dIZWlnaHQgPSBfcHJvcHMucm93SGVpZ2h0O1xuICAgICAgdmFyIHJvd1JlbmRlcmVyID0gX3Byb3BzLnJvd1JlbmRlcmVyO1xuICAgICAgdmFyIG92ZXJzY2FuUm93c0NvdW50ID0gX3Byb3BzLm92ZXJzY2FuUm93c0NvdW50O1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9wcm9wcy5yb3dzQ291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9wcm9wcy5zY3JvbGxUb0luZGV4O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9wcm9wcy5zY3JvbGxUb3A7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMud2lkdGg7XG5cblxuICAgICAgdmFyIGNsYXNzTmFtZXMgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdWaXJ0dWFsU2Nyb2xsJywgY2xhc3NOYW1lKTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9HcmlkMi5kZWZhdWx0LCB7XG4gICAgICAgIHJlZjogJ0dyaWQnLFxuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMsXG4gICAgICAgIGNvbHVtbldpZHRoOiB3aWR0aCxcbiAgICAgICAgY29sdW1uc0NvdW50OiAxLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgbm9Db250ZW50UmVuZGVyZXI6IG5vUm93c1JlbmRlcmVyLFxuICAgICAgICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoX3JlZikge1xuICAgICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfcmVmLmNsaWVudEhlaWdodDtcbiAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gX3JlZi5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYuc2Nyb2xsVG9wO1xuICAgICAgICAgIHJldHVybiBfb25TY3JvbGwoeyBjbGllbnRIZWlnaHQ6IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoX3JlZjIpIHtcbiAgICAgICAgICB2YXIgcm93T3ZlcnNjYW5TdGFydEluZGV4ID0gX3JlZjIucm93T3ZlcnNjYW5TdGFydEluZGV4O1xuICAgICAgICAgIHZhciByb3dPdmVyc2NhblN0b3BJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RvcEluZGV4O1xuICAgICAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZjIucm93U3RhcnRJbmRleDtcbiAgICAgICAgICB2YXIgcm93U3RvcEluZGV4ID0gX3JlZjIucm93U3RvcEluZGV4O1xuICAgICAgICAgIHJldHVybiBvblJvd3NSZW5kZXJlZCh7XG4gICAgICAgICAgICBvdmVyc2NhblN0YXJ0SW5kZXg6IHJvd092ZXJzY2FuU3RhcnRJbmRleCxcbiAgICAgICAgICAgIG92ZXJzY2FuU3RvcEluZGV4OiByb3dPdmVyc2NhblN0b3BJbmRleCxcbiAgICAgICAgICAgIHN0YXJ0SW5kZXg6IHJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgICBzdG9wSW5kZXg6IHJvd1N0b3BJbmRleFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvdmVyc2NhblJvd3NDb3VudDogb3ZlcnNjYW5Sb3dzQ291bnQsXG4gICAgICAgIHJlbmRlckNlbGw6IGZ1bmN0aW9uIHJlbmRlckNlbGwoX3JlZjMpIHtcbiAgICAgICAgICB2YXIgY29sdW1uSW5kZXggPSBfcmVmMy5jb2x1bW5JbmRleDtcbiAgICAgICAgICB2YXIgcm93SW5kZXggPSBfcmVmMy5yb3dJbmRleDtcbiAgICAgICAgICByZXR1cm4gcm93UmVuZGVyZXIocm93SW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICByb3dIZWlnaHQ6IHJvd0hlaWdodCxcbiAgICAgICAgcm93c0NvdW50OiByb3dzQ291bnQsXG4gICAgICAgIHNjcm9sbFRvUm93OiBzY3JvbGxUb0luZGV4LFxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVmlydHVhbFNjcm9sbDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblZpcnR1YWxTY3JvbGwucHJvcFR5cGVzID0ge1xuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIG5hbWUgKi9cbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogSGVpZ2h0IGNvbnN0cmFpbnQgZm9yIGxpc3QgKGRldGVybWluZXMgaG93IG1hbnkgYWN0dWFsIHJvd3MgYXJlIHJlbmRlcmVkKSAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIHJlbmRlcmVyIHRvIGJlIHVzZWQgaW4gcGxhY2Ugb2Ygcm93cyB3aGVuIHJvd3NDb3VudCBpcyAwICovXG4gIG5vUm93c1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzbGljZSBvZiByb3dzIHRoYXQgd2VyZSBqdXN0IHJlbmRlcmVkLlxuICAgKiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IHZvaWRcbiAgICovXG4gIG9uUm93c1JlbmRlcmVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgdG8gcmVuZGVyIGFib3ZlL2JlbG93IHRoZSB2aXNpYmxlIGJvdW5kcyBvZiB0aGUgbGlzdC5cbiAgICogVGhlc2Ugcm93cyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAqL1xuICBvdmVyc2NhblJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxIZWlnaHQsIHNjcm9sbFRvcCB9KTogdm9pZFxuICAgKi9cbiAgb25TY3JvbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCByb3cgaGVpZ2h0IChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgYSByb3cgZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiAoaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgKi9cbiAgcm93SGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFJlc3BvbnNiaWxlIGZvciByZW5kZXJpbmcgYSByb3cgZ2l2ZW4gYW4gaW5kZXggKi9cbiAgcm93UmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBOdW1iZXIgb2Ygcm93cyBpbiBsaXN0LiAqL1xuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFJvdyBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KSAqL1xuICBzY3JvbGxUb0luZGV4OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogVmVydGljYWwgb2Zmc2V0LiAqL1xuICBzY3JvbGxUb3A6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBXaWR0aCBvZiBsaXN0ICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuVmlydHVhbFNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIG5vUm93c1JlbmRlcmVyOiBmdW5jdGlvbiBub1Jvd3NSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25Sb3dzUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUm93c1JlbmRlcmVkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG92ZXJzY2FuUm93c0NvdW50OiAxMFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZpcnR1YWxTY3JvbGw7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5WaXJ0dWFsU2Nyb2xsID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX1ZpcnR1YWxTY3JvbGwyID0gcmVxdWlyZSgnLi9WaXJ0dWFsU2Nyb2xsJyk7XG5cbnZhciBfVmlydHVhbFNjcm9sbDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9WaXJ0dWFsU2Nyb2xsMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9WaXJ0dWFsU2Nyb2xsMy5kZWZhdWx0O1xuZXhwb3J0cy5WaXJ0dWFsU2Nyb2xsID0gX1ZpcnR1YWxTY3JvbGwzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlciA9IHJlcXVpcmUoJy4vQXJyb3dLZXlTdGVwcGVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQXJyb3dLZXlTdGVwcGVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0Fycm93S2V5U3RlcHBlci5BcnJvd0tleVN0ZXBwZXI7XG4gIH1cbn0pO1xuXG52YXIgX0F1dG9TaXplciA9IHJlcXVpcmUoJy4vQXV0b1NpemVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQXV0b1NpemVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0F1dG9TaXplci5BdXRvU2l6ZXI7XG4gIH1cbn0pO1xuXG52YXIgX0NvbHVtblNpemVyID0gcmVxdWlyZSgnLi9Db2x1bW5TaXplcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NvbHVtblNpemVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NvbHVtblNpemVyLkNvbHVtblNpemVyO1xuICB9XG59KTtcblxudmFyIF9GbGV4VGFibGUgPSByZXF1aXJlKCcuL0ZsZXhUYWJsZScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0ZsZXhUYWJsZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuRmxleFRhYmxlO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRmxleENvbHVtbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuRmxleENvbHVtbjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnREaXJlY3Rpb24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLlNvcnREaXJlY3Rpb247XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTb3J0SW5kaWNhdG9yJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5Tb3J0SW5kaWNhdG9yO1xuICB9XG59KTtcblxudmFyIF9HcmlkID0gcmVxdWlyZSgnLi9HcmlkJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnR3JpZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9HcmlkLkdyaWQ7XG4gIH1cbn0pO1xuXG52YXIgX0luZmluaXRlTG9hZGVyID0gcmVxdWlyZSgnLi9JbmZpbml0ZUxvYWRlcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0luZmluaXRlTG9hZGVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0luZmluaXRlTG9hZGVyLkluZmluaXRlTG9hZGVyO1xuICB9XG59KTtcblxudmFyIF9TY3JvbGxTeW5jID0gcmVxdWlyZSgnLi9TY3JvbGxTeW5jJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU2Nyb2xsU3luYycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TY3JvbGxTeW5jLlNjcm9sbFN5bmM7XG4gIH1cbn0pO1xuXG52YXIgX1ZpcnR1YWxTY3JvbGwgPSByZXF1aXJlKCcuL1ZpcnR1YWxTY3JvbGwnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdWaXJ0dWFsU2Nyb2xsJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1ZpcnR1YWxTY3JvbGwuVmlydHVhbFNjcm9sbDtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiogRGV0ZWN0IEVsZW1lbnQgUmVzaXplLlxuKiBGb3JrZWQgaW4gb3JkZXIgdG8gZ3VhcmQgYWdhaW5zdCB1bnNhZmUgJ3dpbmRvdycgYW5kICdkb2N1bWVudCcgcmVmZXJlbmNlcy5cbipcbiogaHR0cHM6Ly9naXRodWIuY29tL3NkZWNpbWEvamF2YXNjcmlwdC1kZXRlY3QtZWxlbWVudC1yZXNpemVcbiogU2ViYXN0aWFuIERlY2ltYVxuKlxuKiB2ZXJzaW9uOiAwLjUuM1xuKiovXG5cbi8vIENoZWNrIGBkb2N1bWVudGAgYW5kIGB3aW5kb3dgIGluIGNhc2Ugb2Ygc2VydmVyLXNpZGUgcmVuZGVyaW5nXG52YXIgX3dpbmRvdztcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICBfd2luZG93ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgX3dpbmRvdyA9IHNlbGY7XG59IGVsc2Uge1xuICBfd2luZG93ID0gdW5kZWZpbmVkO1xufVxuXG52YXIgYXR0YWNoRXZlbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmF0dGFjaEV2ZW50O1xudmFyIHN0eWxlc0NyZWF0ZWQgPSBmYWxzZTtcblxuaWYgKCFhdHRhY2hFdmVudCkge1xuICB2YXIgcmVxdWVzdEZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByYWYgPSBfd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBfd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBfd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiBfd2luZG93LnNldFRpbWVvdXQoZm4sIDIwKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiByYWYoZm4pO1xuICAgIH07XG4gIH0oKTtcblxuICB2YXIgY2FuY2VsRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbmNlbCA9IF93aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBfd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cuY2xlYXJUaW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHJldHVybiBjYW5jZWwoaWQpO1xuICAgIH07XG4gIH0oKTtcblxuICB2YXIgcmVzZXRUcmlnZ2VycyA9IGZ1bmN0aW9uIHJlc2V0VHJpZ2dlcnMoZWxlbWVudCkge1xuICAgIHZhciB0cmlnZ2VycyA9IGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fLFxuICAgICAgICBleHBhbmQgPSB0cmlnZ2Vycy5maXJzdEVsZW1lbnRDaGlsZCxcbiAgICAgICAgY29udHJhY3QgPSB0cmlnZ2Vycy5sYXN0RWxlbWVudENoaWxkLFxuICAgICAgICBleHBhbmRDaGlsZCA9IGV4cGFuZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb250cmFjdC5zY3JvbGxMZWZ0ID0gY29udHJhY3Quc2Nyb2xsV2lkdGg7XG4gICAgY29udHJhY3Quc2Nyb2xsVG9wID0gY29udHJhY3Quc2Nyb2xsSGVpZ2h0O1xuICAgIGV4cGFuZENoaWxkLnN0eWxlLndpZHRoID0gZXhwYW5kLm9mZnNldFdpZHRoICsgMSArICdweCc7XG4gICAgZXhwYW5kQ2hpbGQuc3R5bGUuaGVpZ2h0ID0gZXhwYW5kLm9mZnNldEhlaWdodCArIDEgKyAncHgnO1xuICAgIGV4cGFuZC5zY3JvbGxMZWZ0ID0gZXhwYW5kLnNjcm9sbFdpZHRoO1xuICAgIGV4cGFuZC5zY3JvbGxUb3AgPSBleHBhbmQuc2Nyb2xsSGVpZ2h0O1xuICB9O1xuXG4gIHZhciBjaGVja1RyaWdnZXJzID0gZnVuY3Rpb24gY2hlY2tUcmlnZ2VycyhlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0V2lkdGggIT0gZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy53aWR0aCB8fCBlbGVtZW50Lm9mZnNldEhlaWdodCAhPSBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLmhlaWdodDtcbiAgfTtcblxuICB2YXIgc2Nyb2xsTGlzdGVuZXIgPSBmdW5jdGlvbiBzY3JvbGxMaXN0ZW5lcihlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xuICAgIHJlc2V0VHJpZ2dlcnModGhpcyk7XG4gICAgaWYgKHRoaXMuX19yZXNpemVSQUZfXykgY2FuY2VsRnJhbWUodGhpcy5fX3Jlc2l6ZVJBRl9fKTtcbiAgICB0aGlzLl9fcmVzaXplUkFGX18gPSByZXF1ZXN0RnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNoZWNrVHJpZ2dlcnMoZWxlbWVudCkpIHtcbiAgICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy53aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGVsZW1lbnQuX19yZXNpemVMYXN0X18uaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgIGZuLmNhbGwoZWxlbWVudCwgZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8qIERldGVjdCBDU1MgQW5pbWF0aW9ucyBzdXBwb3J0IHRvIGRldGVjdCBlbGVtZW50IGRpc3BsYXkvcmUtYXR0YWNoICovXG4gIHZhciBhbmltYXRpb24gPSBmYWxzZSxcbiAgICAgIGFuaW1hdGlvbnN0cmluZyA9ICdhbmltYXRpb24nLFxuICAgICAga2V5ZnJhbWVwcmVmaXggPSAnJyxcbiAgICAgIGFuaW1hdGlvbnN0YXJ0ZXZlbnQgPSAnYW5pbWF0aW9uc3RhcnQnLFxuICAgICAgZG9tUHJlZml4ZXMgPSAnV2Via2l0IE1veiBPIG1zJy5zcGxpdCgnICcpLFxuICAgICAgc3RhcnRFdmVudHMgPSAnd2Via2l0QW5pbWF0aW9uU3RhcnQgYW5pbWF0aW9uc3RhcnQgb0FuaW1hdGlvblN0YXJ0IE1TQW5pbWF0aW9uU3RhcnQnLnNwbGl0KCcgJyksXG4gICAgICBwZnggPSAnJztcbiAge1xuICAgIHZhciBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlZWxlbWVudCcpO1xuICAgIGlmIChlbG0uc3R5bGUuYW5pbWF0aW9uTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhbmltYXRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhbmltYXRpb24gPT09IGZhbHNlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbVByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlbG0uc3R5bGVbZG9tUHJlZml4ZXNbaV0gKyAnQW5pbWF0aW9uTmFtZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwZnggPSBkb21QcmVmaXhlc1tpXTtcbiAgICAgICAgICBhbmltYXRpb25zdHJpbmcgPSBwZnggKyAnQW5pbWF0aW9uJztcbiAgICAgICAgICBrZXlmcmFtZXByZWZpeCA9ICctJyArIHBmeC50b0xvd2VyQ2FzZSgpICsgJy0nO1xuICAgICAgICAgIGFuaW1hdGlvbnN0YXJ0ZXZlbnQgPSBzdGFydEV2ZW50c1tpXTtcbiAgICAgICAgICBhbmltYXRpb24gPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGFuaW1hdGlvbk5hbWUgPSAncmVzaXplYW5pbSc7XG4gIHZhciBhbmltYXRpb25LZXlmcmFtZXMgPSAnQCcgKyBrZXlmcmFtZXByZWZpeCArICdrZXlmcmFtZXMgJyArIGFuaW1hdGlvbk5hbWUgKyAnIHsgZnJvbSB7IG9wYWNpdHk6IDA7IH0gdG8geyBvcGFjaXR5OiAwOyB9IH0gJztcbiAgdmFyIGFuaW1hdGlvblN0eWxlID0ga2V5ZnJhbWVwcmVmaXggKyAnYW5pbWF0aW9uOiAxbXMgJyArIGFuaW1hdGlvbk5hbWUgKyAnOyAnO1xufVxuXG52YXIgY3JlYXRlU3R5bGVzID0gZnVuY3Rpb24gY3JlYXRlU3R5bGVzKCkge1xuICBpZiAoIXN0eWxlc0NyZWF0ZWQpIHtcbiAgICAvL29wYWNpdHk6MCB3b3JrcyBhcm91bmQgYSBjaHJvbWUgYnVnIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yODYzNjBcbiAgICB2YXIgY3NzID0gKGFuaW1hdGlvbktleWZyYW1lcyA/IGFuaW1hdGlvbktleWZyYW1lcyA6ICcnKSArICcucmVzaXplLXRyaWdnZXJzIHsgJyArIChhbmltYXRpb25TdHlsZSA/IGFuaW1hdGlvblN0eWxlIDogJycpICsgJ3Zpc2liaWxpdHk6IGhpZGRlbjsgb3BhY2l0eTogMDsgfSAnICsgJy5yZXNpemUtdHJpZ2dlcnMsIC5yZXNpemUtdHJpZ2dlcnMgPiBkaXYsIC5jb250cmFjdC10cmlnZ2VyOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCIgXFxcIjsgZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBvdmVyZmxvdzogaGlkZGVuOyB9IC5yZXNpemUtdHJpZ2dlcnMgPiBkaXYgeyBiYWNrZ3JvdW5kOiAjZWVlOyBvdmVyZmxvdzogYXV0bzsgfSAuY29udHJhY3QtdHJpZ2dlcjpiZWZvcmUgeyB3aWR0aDogMjAwJTsgaGVpZ2h0OiAyMDAlOyB9JyxcbiAgICAgICAgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfVxuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgc3R5bGVzQ3JlYXRlZCA9IHRydWU7XG4gIH1cbn07XG5cbnZhciBhZGRSZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZFJlc2l6ZUxpc3RlbmVyKGVsZW1lbnQsIGZuKSB7XG4gIGlmIChhdHRhY2hFdmVudCkgZWxlbWVudC5hdHRhY2hFdmVudCgnb25yZXNpemUnLCBmbik7ZWxzZSB7XG4gICAgaWYgKCFlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXykge1xuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT0gJ3N0YXRpYycpIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY3JlYXRlU3R5bGVzKCk7XG4gICAgICBlbGVtZW50Ll9fcmVzaXplTGFzdF9fID0ge307XG4gICAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18gPSBbXTtcbiAgICAgIChlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5jbGFzc05hbWUgPSAncmVzaXplLXRyaWdnZXJzJztcbiAgICAgIGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZXhwYW5kLXRyaWdnZXJcIj48ZGl2PjwvZGl2PjwvZGl2PicgKyAnPGRpdiBjbGFzcz1cImNvbnRyYWN0LXRyaWdnZXJcIj48L2Rpdj4nO1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyk7XG4gICAgICByZXNldFRyaWdnZXJzKGVsZW1lbnQpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxMaXN0ZW5lciwgdHJ1ZSk7XG5cbiAgICAgIC8qIExpc3RlbiBmb3IgYSBjc3MgYW5pbWF0aW9uIHRvIGRldGVjdCBlbGVtZW50IGRpc3BsYXkvcmUtYXR0YWNoICovXG4gICAgICBhbmltYXRpb25zdGFydGV2ZW50ICYmIGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fLmFkZEV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uc3RhcnRldmVudCwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUuYW5pbWF0aW9uTmFtZSA9PSBhbmltYXRpb25OYW1lKSByZXNldFRyaWdnZXJzKGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5wdXNoKGZuKTtcbiAgfVxufTtcblxudmFyIHJlbW92ZVJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlUmVzaXplTGlzdGVuZXIoZWxlbWVudCwgZm4pIHtcbiAgaWYgKGF0dGFjaEV2ZW50KSBlbGVtZW50LmRldGFjaEV2ZW50KCdvbnJlc2l6ZScsIGZuKTtlbHNlIHtcbiAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18uc3BsaWNlKGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5pbmRleE9mKGZuKSwgMSk7XG4gICAgaWYgKCFlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18ubGVuZ3RoKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbExpc3RlbmVyKTtcbiAgICAgIGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fID0gIWVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18pO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZFJlc2l6ZUxpc3RlbmVyOiBhZGRSZXNpemVMaXN0ZW5lcixcbiAgcmVtb3ZlUmVzaXplTGlzdGVuZXI6IHJlbW92ZVJlc2l6ZUxpc3RlbmVyXG59OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiogQHByb3ZpZGVzTW9kdWxlIHNoYWxsb3dDb21wYXJlXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzaGFsbG93RXF1YWwgPSByZXF1aXJlKCdmYmpzL2xpYi9zaGFsbG93RXF1YWwnKTtcblxuLyoqXG4gKiBEb2VzIGEgc2hhbGxvdyBjb21wYXJpc29uIGZvciBwcm9wcyBhbmQgc3RhdGUuXG4gKiBTZWUgUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluXG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dDb21wYXJlKGluc3RhbmNlLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICByZXR1cm4gIXNoYWxsb3dFcXVhbChpbnN0YW5jZS5wcm9wcywgbmV4dFByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKGluc3RhbmNlLnN0YXRlLCBuZXh0U3RhdGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dDb21wYXJlOyJdfQ==
