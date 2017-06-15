'use strict';

var localization={
 currentLanguage: 'ru',
 data: [
  {
   language: 'en',
   strings: {
    HOME: 'Home',
    FEATURES: 'Features',
    SCREENSHOTS: 'Screenshots',
    PRESENTATION: 'Presentation'
   }
  },
  {
   language: 'ru',
   strings: {
    HOME: 'Наверх',
    FEATURES: 'Функции',
    SCREENSHOTS: 'Скриншоты',
    PRESENTATION: 'Презентация'
   }
  },
  {
   language: 'ch',
   strings: {
    HOME: '家',
    FEATURES: '特点',
    SCREENSHOTS: '截图',
    PRESENTATION: '介绍'
   }
  }
 ],
 getStrings: function() {
     for(var i = 0; i<this.data.length; i++){
         if(this.data[i].language == this.currentLanguage){
             return this.data[i].strings;
            }
        }
        //if language not found then return defafult first language
        return this.data[0].strings;
    },
    translateKey: function(key){
        return eval("this.getStrings()." + key);
    },
    translatePage: function (language) {
        this.currentLanguage = language;
        var allElements = document.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++) {
            var key = allElements[i].getAttribute("lng");
            if (key !== null){
                if(allElements[i].tagName == 'input'){
                    allElements[i].value = this.translateKey(key);
                }
                else {
                    allElements[i].innerHTML = this.translateKey(key);
                }
            }
        }
    }
};


$( document ).ready( function () {
    $('#lang-en,#lang-ru, #lang-ch').click(function (e) {
        var lang = this.getAttribute("language");
        localization.translatePage(lang);
        $(this).tab('show');
        e.preventDefault()  
    });
    localization.translatePage("en");
})