/* button print document*/
$(function () {
    $("#print-page").click(() => {
        window.print();
    });
});

/* change map for print */
$('#customFile').change((event) => {
    //create pseudo url
    let url = URL.createObjectURL(event.target.files[0]);
    $('.container-fluid').css('background-image', `url(${url})`);
});
/* button save in model window */
$('.btn-save').click(() => {
    let address = $('#addressFormControlInput').val();
    $('#new-address').text(address);
    $('.modal').modal('hide');
    $('#print-page').prop('disabled', false);
    /*  $('#addressFormControlInput').val(''); */
    /*  $('#editor').click(()=>{
         let val = $("#editor :selected").text();
         console.log(val);
         $('.performer').text(val);
     }) */
});

const note1 = 'Картографічні матеріали станом на 2013 р.';
const note2013 = 'Станом на 2013 р.';
const note2019 = 'Станом на 2019 р.';

function createText(val) {
    $('#this-text').text(
        `Копія топографо-геодезичних матеріалів з масштабу 1:${val}
                     наявних в управлінні архітектури та урбаністики
     `);
}

$('#editor').change(() => {
    let val = $("#editor :selected").text();
    $('.performer').text(val);
});

$('#scale').change(() => {
    let value = $("#scale :selected").text();
   
    if (value === '2000') {
        createText(value);
        $('.note').text(note1).show();
        // $('.note').show();
    } else if (value === '500'){
        $('.note').hide();
        createText(value);
    } else if (value === 'орто-2013') {
        $('#this-text').text(
            `Копія з фрагменту ортофотоплану
         `);
         $('.note').text(note2013).show();
    }
    else if (value === 'орто-2019') {
        $('#this-text').text(
            `Копія з фрагменту ортофотоплану
         `);
         $('.note').text(note2019).show();
    }
});