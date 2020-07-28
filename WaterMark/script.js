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
   /*  $('#addressFormControlInput').val(''); */
   /*  $('#editor').click(()=>{
        let val = $("#editor :selected").text();
        console.log(val);
        $('.performer').text(val);
    }) */
})

$('#editor').change(()=>{
    let val = $("#editor :selected").text();
    console.log(val);
    $('.performer').text(val);
})

