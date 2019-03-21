apiUrl = 'https://jsonplaceholder.typicode.com/users';

formFields = {
	name: {
		tag: 'input',
		attrs: {
			type: 'text',
			id: 'name',
			placeholder: 'Your name',
			required: true
		},
		valueAttr: 'value'
	},
	email: {
		tag: 'input',
		attrs: {
			type: 'email',
			id: 'email',
			placeholder: 'Your email',
			required: true
		},
		valueAttr: 'value'
	},
	details: {
		tag: 'textarea',
		attrs: {
			id: 'details',
			required: true
		},
		valueAttr: 'value'
	},
	privacy: {
		tag: 'input',
		attrs: {
			type: 'checkbox',
			id: 'privacy',
			required: true
		},
		valueAttr: 'checked'
	}
};

function submitHandler(form) {
	var method = form.getAttribute('method');
	var url = form.getAttribute('action');
	var urlEncodedData = '';
	var urlEncodedDataPairs = [];
	var name;
	var field;
	var fieldDOM;
	var val = '';
	for (name in formFields) {
		field = formFields[name];
		fieldDOM = document.getElementById(field.attrs.id);
		if (fieldDOM) {
			val = fieldDOM[field.valueAttr];
		}
		urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(val));
	}
	urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
	var request = new XMLHttpRequest();
	request.open(method, url);
	request.addEventListener('load', function() {
		loadHandler(form);
	});
	request.addEventListener('error', function() {
		alert('Form submit error');
	});
	request.responseType = 'json';
	request.send(urlEncodedData);
}

function loadHandler(form) {
	form.reset();
}

FormModule.setFields(formFields);
var form = FormModule.createForm('POST', apiUrl);
FormModule.onSubmit(submitHandler);

document.getElementsByTagName('body')[0].appendChild(form);
