var FormModule = (function() {
	var form = null;
	var fields = {};

	function addField(field) {
		fields.push(field);
	}

	function setFields(_fields) {
		fields = _fields;
	}

	function onSubmit(onSubmitCallback) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			onSubmitCallback(form);
		});
	}

	function createField(f) {
		var field = document.createElement(f.tag);
		var attr;
		for (attr in f.attrs) {
			field.setAttribute(attr, f.attrs[attr]);
		}

		return field;
	}

	function createForm(method, action) {
		form = document.createElement('form');
		form.setAttribute('method', method);
		form.setAttribute('action', action);
		var field;
		for (field in fields) {
			form.appendChild(createField(fields[field]));
		}

		var submit = document.createElement('input');
		submit.setAttribute('type', 'submit');
		submit.setAttribute('value', 'Invia');

		form.appendChild(submit);

		form.addEventListener('submit', function(e) {
			e.preventDefault();
			submitHandler(form);
		});

		return form;
	}

	return {
		addField: addField,
		setFields: setFields,
		createForm: createForm,
		onSubmit: onSubmit
	};
})();
