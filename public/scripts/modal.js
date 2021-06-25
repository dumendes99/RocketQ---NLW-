export default function Modal(){

	const modalWrapper = document.querySelector('.modal-wrapper')
	const cancelButton = document.querySelector('.button.cancel')

	cancelButton.addEventListener("click", close)

	function open(){
		// function for add class active for class modal
		modalWrapper.classList.add("active") 
	}
	function close(){
		//function for removes the class active of modal
		modalWrapper.classList.remove("active")
	}

	return {
		open,
		close
	}
}
