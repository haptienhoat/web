$('#linklogin').click(function () {
    $('.modals').css('display','block')
    $('#login').css('display', 'block')
    $('#signup').css('display', 'none')
})

$('#linksignup').click(function () {
    $('.modals').css('display','block')
    $('#signup').css('display', 'block')
    $('#login').css('display', 'none')
})

$('#splogin').click(function () {
    $('#login').css('display', 'block')
    $('#signup').css('display', 'none')
})

$('#spsignup').click(function () {
    $('#signup').css('display', 'block')
    $('#login').css('display', 'none')
})

var productId;

$('#destroy-product-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    productId = button.data('id');
})

$('#destroy-product-modal').click(function () {
    var deleteForm = document.forms['destroy-product-form'];
    deleteForm.action = '/admin/' + productId + '/destroy';
    deleteForm.submit();
})

$('.modals').click(function (e)
{
    if (!($('.modals-body').is(e.target)) && $('.modals-body').has(e.target).length === 0) {
        $('.modals').hide();
    }
});