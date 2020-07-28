

/* button print document*/
$(function () {
    $("#print-page").click(() => {
        window.print();
    })
})

/* change map for print */
$('#customFile').change((event) => {
    //create pseudo url
    let url = URL.createObjectURL(event.target.files[0]);
    $('.container-fluid').css('background-image', `url(${url})`);
})
/* button save in model window */
$('.btn-save').click(() => {
    let address = $('#addressFormControlInput').val()
    $('#new-address').text(address);
    $('.modal').modal('hide');
    $('#print-page').prop('disabled', false);
    /*  $('#addressFormControlInput').val(''); */
    /*  $('#editor').click(()=>{
         let val = $("#editor :selected").text();
         console.log(val);
         $('.performer').text(val);
     }) */
})

$('#editor').change(() => {
    let val = $("#editor :selected").text();
    $('.performer').text(val);
})

$('#scale').change(() => {
    let val = $("#scale :selected").text();

    if(val === '2000'){
        $('.note').show();
    } else{
       $('.note').hide();
    }

    $('#this-text').text(
                    `Копія топографо-геодезичних матеріалів з масштабу 1:${val}
                     наявних в управлінні архітектури та урбаністики
     `);
     
})