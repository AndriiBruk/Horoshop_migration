import './main.scss';

const regSite = /.+/i;
const regEmail = /.+@.+\..+/i;


let inputs = document.querySelectorAll('input');

for (let input of inputs) {
	input.addEventListener('blur', function(){

		let inputClasses = this.classList;
		let inputValue = this.value;
		let check;

		for (let className of inputClasses){

			switch (className) {
				case 'url-field':
				check = regSite.test(inputValue);
				break;
	
				case 'email-field':
				check = regEmail.test(inputValue);
				break;
			}
	
			if (check) {
				this.classList.remove('invalid')
				this.classList.add('valid')
	
			} else {
				this.classList.remove('valid')
				this.classList.add('invalid')
			}
		}
				
	})
}


