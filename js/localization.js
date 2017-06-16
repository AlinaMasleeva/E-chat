'use strict';

var localization = {
  currentLanguage: 'en',

  data: [
    { language: 'en', strings: null/*strings will be loaded if null*/ },
    // { language: 'ru', strings: null/*strings will be loaded if null*/ }, //Russian
    { language: 'ch', strings: null/*strings will be loaded if null*/ }
  ],

  getLanguageIndex: function (language) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].language == language) {
        return i;
      }
    }
    //if language not found then return defafult first language
    return 0;
  },

  getStrings: function () {
    return localization.data[this.getLanguageIndex(this.currentLanguage)].strings;
  },

  loadStrings: function (language, callback) {
    var index = this.getLanguageIndex(language);
    var strings = this.data[index].strings;
    if (strings == undefined || strings == null) {
      var lang = this.data[index].language;
      $.ajax({
        url: 'languages/' + lang + '.json',
        dataType: 'json'
      }).done(function (response) {
        localization.data[index] = response;
        callback();
      }).error(function (response) {
        alert("error loading languages");
      });
    } else {
      callback();
    }
  },

  translateKey: function (key) {
    return eval("localization.getStrings()." + key);
  },

  translatePage: function (language) {
    localization.loadStrings(language, function () {
      localization.currentLanguage = language;
      var allElements = document.getElementsByTagName('*');
      for (var i = 0, n = allElements.length; i < n; i++) {
        var key = allElements[i].getAttribute("lng");
        if (key !== null) {
          if (allElements[i].tagName == 'input') {
            allElements[i].value = localization.translateKey(key);
          }
          else {
            allElements[i].innerHTML = localization.translateKey(key);
          }
        }
      }
    });
  }
};

$(document).ready(function () {
  $('#lang-en, #lang-ch').click(function (e) { //#lang-ru
    var lang = this.getAttribute("language");
    localization.translatePage(lang);
    $(this).tab('show');
    e.preventDefault()
  });
  localization.translatePage("en");
})