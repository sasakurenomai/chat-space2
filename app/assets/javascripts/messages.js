$(function(){

  var buildHTML = function(message){
    if ( message.body && message.image ) {
      var html = `<div class='chat-main__messages__message' data-message-id=` + message.id + `>` +
          `<div class='chat-main__messages__message__upper-info'>
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
          <img src=${message.image} ></img>
        </div>`
    } else if (message.body){
      var html = `<div class='chat-main__messages__message' data-message-id=` + message.id + `>` +
          `<div class='chat-main__messages__message__upper-info'>
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
    } else if (message.image){
      var html = `<div class='chat-main__messages__message' data-message-id=` + message.id + `>` +
      `<div class='chat-main__messages__message__upper-info'>
        <div class='chat-main__messages__message__upper-info__talker'>
          ${message.user_name}
        </div>
        <div class='chat-main__messages__message__upper-info__date'>
          ${message.created_at}
        </div>
      </div>
      <img src=${message.image} ></img>
    </div>`
    };
    return html;
  };
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

  
  var reloadMessages = function() {
    
    var last_message_id = $('.chat-main__messages__message:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json', 
      data: {id: last_message_id}
    })
  
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }

    })


    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  } 

});



