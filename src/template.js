/* global TrelloPowerUp */

var GRAY_ICON = './images/icon-gray.svg';

var cardButtonCallback = function(t){
  return t.overlay({
    url: './overlay.html',
    args: { rand: (Math.random() * 100).toFixed(0) }
  })
};

TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'compose',
      callback: cardButtonCallback
    }];
  },
  'show-settings' : function(t){
    return t.popup({
       title: "Authorize",
       url: './authorize.html',
       height: 250
    });
  }
});
