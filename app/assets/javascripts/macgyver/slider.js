(function($) {
  $.fn.macgyver.slider = (function($els){
    $els.each(function(){
      var $instigator = $(this),
          defaults = {"range" : "min"};
          options = $.extend(true, {}, defaults, $instigator.data('macgyver-options') || {});

      var $ui;
      if(options['target']) {
        $ui = $(options['target']);
      } else {
        var id = $instigator.attr('id');
        var extras = '';
        if(id) {
          extras = ' id="' + id + '-macgyver-slider"';
        }
        $ui = $('<div' + extras + '></div>').insertAfter($instigator);
      }

      options.value = $instigator.val();
      if ($instigator.is('select')) {
        var $options = $instigator.find('option');
        options.min = parseInt($options.first().val());
        options.max = parseInt($options.last().val());
        options.step = $options.length;
      } else {
        options.min = parseInt($instigator.attr('min') || $instigator.data('min'));
        options.max = parseInt($instigator.attr('max') || $instigator.data('max'));
        options.step = parseInt($instigator.attr('step') || $instigator.data('step'));

        $instigator.change(function(){
          var val = parseInt($instigator.val());
          if (val > options.max) { val = options.max; }
          if (val < options.min) { val = options.min; }
          if (isNaN(val)) { val = options.value; }
          $instigator.val(val);
          $instigator.next('.ui-slider').slider('option','value',val);
        });
      }
      options.slide = function(event,slider) { $instigator.val(slider.value); };

      if(options['min-label']) {
        $ui.append('<span class="min-amount">' + options.min + '</span>');
      }
      if(options['max-label']) {
        $ui.append('<span class="max-amount">' + options.max + '</span>');
      }

      $ui.slider(options);
    });
    return this;
  });
})(jQuery);
