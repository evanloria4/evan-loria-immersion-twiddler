
$(document).ready(() => {
  const $body = $('body'); // <> not used when tag already exists
  $body.html('');
  // Create a div tag
  const $divToPrepend = $('<div id=main></div>'); // <> are used when creating a tag
  // Prepend the div tag to the document
  $('body').append($divToPrepend);
  function createTweet(array){
    $body.html('');
    // Maps over the array containing the tweets 
  const $tweets = array.map((tweet) => {
    // Create a div tag for tweets
    const $tweet = $('<div class=tweet></div>');
    // Create new div for usernames
    const $user = $('<div id=username><div>');
    // Add tweet.user text to the tag
    $user.text(`@${tweet.user}:`);
    // Create a class equal to the username for each user div
    $user.addClass(`${tweet.user}`)
    // Create new div for messages
    const $tweetMessage = $('<div id=message><div>');
    // Add tweet.message text to the tag
    $tweetMessage.text(`${tweet.message}`);
    // Create new $div to put timestamp in 
      // Invoke moment().format() on the created_at key 
          // Pass in the value as text to the $datTimeStamp
        const $dateTimestamp = $('<div id=timestamp></div>').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm a'));
        const $elapsedTimestamp = moment(tweet.created_at).startOf(tweet.created_at).fromNow();
        $dateTimestamp.append(' ' + $elapsedTimestamp);
    // Append the $user, $tweetMessage, and timestamp to the originally created div
        $tweet.append($user).append($tweetMessage).append($dateTimestamp)
    

      // When the $user is clicked
      // Invoke create tweet on the array of streams.users[<clicked on user>]
    $user.on('click', function(){ 
      $divToPrepend.html('');
      $('#tweeting').html('');
      createTweet(streams.users[tweet.user])
      })
      return $tweet
      })
  // Loop over the created $tweets array and prepend each tweet to the  $divToPrepend div
  for (let i = 0; i < $tweets.length; i++){
    $divToPrepend.prepend($tweets[i]);
    }
  };
// Call create tweet function on the homes array
  createTweet(streams.home);
  // Create button element
  const $button = $('<button id=button>Refresh Tweets</button>');
  // Declare the text in the button tag
  // $button.text('Refresh Tweets');
  // Prepend the button to the body
  $('head').after($button);
  // When button is clicked
  $('button').on('click', function(){
    // If the form is empty 
    if ($('#tweeting').is(':empty')){
      // Call createForms()
      createForms($form);
  
     
    } 
    createTweet(streams.home);
  }) 

  // ALLOWING USER TO TWEET 
  // createForms() function 
  const $form = $('<div id=tweeting>');
  function createForms(form) {  
    // Create a div tag for the forms 
  
  // Attach the $formDiv after the button 
  $('button').after(form);
  // Create form tags that take text and append them to the created div $formDiv
  let $nameBox = $('<div id=nameBox class=box><label>Username: <input id=inputUser placeholder=user></label></div>');

  form.append($nameBox);
  const $tweetBox = $('<div id=tweetBox class=box><label>Tweet: <textarea id=tweetText></textarea></label></div>');
  const $postButton = $('<button id=postButton>POST</button>');
  $tweetBox.appendTo($nameBox);
  $postButton.appendTo($tweetBox)
  $('#postButton').on('click', function (){
    let visitorObj = document.getElementById('inputUser')
    visitor = visitorObj.value
    let messageObj = document.getElementById('tweetText')
    message = messageObj.value
    if (streams.users.hasOwnProperty(visitor) === false){
      streams.users[visitor] = []
    } 
      writeTweet(message);
      let index = streams.users[visitor].length - 1;
      if (streams.users[visitor][index].hasOwnProperty('created_at') === false){
        streams.users[visitor][index]['created_at'] = moment();
      }
      createTweet(streams.users[visitor])
      $('#tweeting').html('')
      createForms($form)
  })
  
  // $('#postButton').on('click', function {
   // writeTweet()
  // $('#main').append('<input label=></input>')

}
$('head').after($('<div id=Title><h1>TWIDDLER</h1></div>'))
createForms($form);
// Formatting here]
$('#Title').css({color: 'rgb(77, 137, 99)',
  fontSize: '35px',
  fontFamily: 'Georgia',
  backgroundColor: 'rgb(100, 100, 100)'
  }

)
$('body').css({
  backgroundColor: 'rgb(68, 114, 148)'
  })
$('h1').css('text-align', 'center');
$('.tweet').css({
  backgroundColor: 'rgd(120, 120, 120)',
  paddingTop: '1.5px',
  paddingLeft: '0px',
  paddingBottom: '2px',
  paddingRight: '2px',
  fontSize: '15px'
  });

$('.box').css({
  textAlign: 'justify',
  paddingTop: '5px',
  paddingLeft: '5px',
  paddingBottom: '2px',
  paddingRight: '5px'
  });
$('#postButton').css({
  height: '18px',
  width: '80px',
  fontSize: '12px',
  fontFamily: 'Times New Roman',
  paddingLeft: '15px',
  textAlign: 'center'
})
$('button').css({
  borderRadius: '8px'
})
})