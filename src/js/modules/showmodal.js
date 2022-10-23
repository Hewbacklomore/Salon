function show() {
    const humburger = document.querySelector('.header__hamburger'),
      modal = document.querySelector('.modal'),
      yellowMain = document.querySelector('#yellow'),
      closeBtn = document.querySelectorAll('.close'),
      form = document.querySelector('form'),
      mainBody = document.body,
      thanksModal = document.querySelector('.thanks');


      
    yellowMain.style.color = '#CDAA7D';
    



    let postForm = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: data
        })

        return await res.json();
    };

    


    form.addEventListener('submit', function(event) {
        event.preventDefault();


        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        let timerId = setTimeout(function() {
            closeModal();
        }, 1000);

        postForm('http://localhost:3000/requests', json)
            .then(function(data) {
                console.log(data);
                closeModal();
                newModal();
                timerId;
            }).catch(function(data) {
                alert('something wrong')
            }).finally(function(data) {
                form.reset();
            })
    })


   
    closeBtn.forEach(function(item) {
        item.addEventListener('click', closeModal);
    })
    
    

    function showModal() {
        modal.style.display = 'block';
    }

    let newModal = function newModal () {

        thanksModal.style.display = 'block';
        
        mainBody.append(thanksModal);
        
        
    };



  

    function closeModal() {
        modal.style.display = 'none';
        thanksModal.style.display = 'none';
    }


    modal.addEventListener('click', function(event) {
        if(modal === event.taget || event.target.getAttribute('data-close') === '') {
            closeModal();
             /* newModal();  */
             

              setTimeout(function() {
                closeModal();
             },3000) 
            
        }
    })

    


humburger.addEventListener('click', function() {
    showModal();
});

    setTimeout(function() {
        showModal();
    }, 1000)

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
            console.log(window.pageYOffset);
        }

        
    };

    window.addEventListener('scroll', showModalByScroll);

    document.addEventListener('keydown', function(event) {
        if(event.code == 'Escape') {
            closeModal();
        }
    })

}

export default show;