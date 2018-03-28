$('.btn').on('click', (event) => {
    const name = $.trim($('#userName').val()),
        email = $.trim($('#email').val()),
        $id = $(event.target).attr('id');

    let url = `http://127.0.0.1:3001/${$id}`,
        contentType = 'application/x-www-form-urlencoded',
        processData = true,
        data = { name, email };

    switch ($id) {
        case 'json':
            contentType = 'application/json';
            data = JSON.stringify(data);
            break;
        case 'formData':
            contentType = false;
            processData = false;
            data = new FormData();
            data.append('name', name);
            data.append('email', email);
            break;
        default:
    }

    $.ajax({
        method: 'post',
        url,
        contentType,
        processData,
        data
    }).done((msg) => {
        console.info(msg);
    }).fail((err) => {
        console.error(err);
    }).always(() => {

    });
});
