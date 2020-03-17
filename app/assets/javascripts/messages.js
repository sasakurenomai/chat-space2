$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class='chat-main__messages__message'>
          <div class='chat-main__messages__message__upper-info'>
            <div class='chat-main__messages__message__upper-info__talker'>
              ${message.user_name}
            </div>
            <div class='chat-main__messages__message__upper-info__date'>
              ${message.created_at}
            </div>
          </div>
          <div class='chat-main__messages__content'>
            <p class="message__text">
              ${message.body}
            </p>
          </div>
          </div>
          <img src=${message.image} ></img>
        </div>`
      return html;
    } else {
      var html =
        `<div class='chat-main__messages__message'>
          <div class='chat-main__messages__message__upper-info'>
            <div class='chat-main__messages__message__upper-info__talker'>
              ${message.user_name}
            </div>
            <div class='chat-main__messages__message__upper-info__date'>
              ${message.created_at}
            </div>
          </div>
          <div class='chat-main__messages__content'>
            <p class="message__text">
              ${message.body}
            </p>
          </div>
            <div class='chat-main__messages__message__upper-info__delete'>
            </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",   
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信失敗・・・・・");
    })
  });
});



