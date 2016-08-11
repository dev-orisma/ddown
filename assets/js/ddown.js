(function($){
    $.DDown = function(el, options){
        // To avoid scope issues, use '_this' instead of 'this'
        // to reference this class from internal events and functions.
        var _this = this;

        // Access to jQuery and DOM versions of element
        _this.$el = $(el);
        _this.el = el;

        _this.initials = {
        	waitElement: null
        };

        _this.searchString = "";

        _this.searchInterval = 0; 

        _this.resetSearchString = function(){
            _this.searchString = "";
            clearInterval(_this.searchInterval); 
        } 

        $.extend(_this, _this.initials);

        // Add a reverse reference to the DOM object
        _this.$el.data("DDown", _this);

        _this.listClick = function() {
        	var _this = this;
        	_this.$el.next(".dropdown-list-data").find(".dropdown-list-data-inner li").click(function(){
				var nowElm = $(this);
				var val = $(this).data("val");
				var text = $(this).text();
				var parent = nowElm.parent().parent();
				var firstInit = true;

				nowElm.addClass('active');
				nowElm.siblings().removeClass("active");
				parent.hide();
				parent.prev().find(".dropdown-list-text").text(text);
				parent.nextAll("input").val(val);
				_this.$el.removeClass("active-list");

				if(!_this.$el.parent().hasClass("ddDownInit")){
					firstInit = false;
				}else{
					_this.$el.parent().removeClass("ddDownInit")
				} 
				_this.settings["afterSelectList"](_this.$el, nowElm, firstInit);
			});
        }
        _this.hideDropdown = function() {
        	var _this = this;
        	$('body').click(function(e) {
			    var target = $(e.target);
			    if(!target.is('.list-title,.list,.inner-list-service,.inner-list-title,.inner-list-service-list,.dropdown-list-data-service,.dropdown-list-arrow-down,.dropdown-list-text,.dropdown-list-data,.dropdown-list-data-inner,.dropdown-list,.btn-list,.btn-img')) {   
                    if ( $('.dropdown-list-data').is(':visible') ){
                        $('.dropdown-list-data,.dropdown-list-data-service').hide();
                    } 
			       	$('.dropdown-list').removeClass("active-list");
			    } 
                if ( !$('.dropdown-list-data').is(':visible') ) {
                    $(document).unbind("keypress",_this.searchEvent);  
                }
			});
          
        }
        _this.elementClick = function() {
        	var _this = this; 
            _this.$el.click(function(){
                            var nowElm = $(this);   
                           $(".dropdown-list-data").not(nowElm.next(".dropdown-list-data")).hide();  
                            if(!nowElm.next(".dropdown-list-data").is(":visible")){
                                nowElm.next(".dropdown-list-data").show();
                                _this.$el.addClass("active-list");
                                $(document).bind("keypress",_this.searchEvent);
                            }else{
                                nowElm.next(".dropdown-list-data").hide();
                                _this.$el.removeClass("active-list");
                                 $(document).unbind("keypress",_this.searchEvent);  
                            } 
                            _this.settings["afterClickDropdown"](_this.$el);  
            }); 
            _this.listClick(); 
            _this.hideDropdown();
		}
  
        _this.init = function(){
        	var _this = this;

            _this.settings = $.extend({},$.DDown.defaultOptions, options);

            _this.$el.parent().css({
            	"position":"relative"
            }).addClass("ddDownInit");
            _this.setDevice(); 
            _this.elementClick();
           
        };

        _this.setDevice = function(){
        	var _this = this;

        	if(_this.isMobile()){
            	_this.$el.next(".dropdown-list-data").addClass("ddDownMobile");
            }else{
            	_this.$el.next(".dropdown-list-data").addClass("ddDownDesktop");
            }
        }

        _this.isMobile = function(){
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        _this.searchEvent = function(e){ 
            _this.searchString += e.key;
            _this.searchText( _this.$el.next(".dropdown-list-data").find(".dropdown-list-data-inner li") , _this.searchString);
            clearInterval(_this.searchInterval);
            _this.searchInterval = setInterval(_this.resetSearchString, 1000);
        }
        
        _this.searchText = function(list_data,text){ 
            var _this = this;
            var offset = list_data.first().position().top; 
            list_data.each(function () {
                    if ($(this).text().search(new RegExp("^"+text+".*", "i")) >= 0) { 
                          $(this).parent().animate({
                             scrollTop: $(this).position().top - offset
                            }, 'fast');   
                        return false; 
                    }  
            }); 
        }

        // Run initializer
        _this.init();
    };

    $.DDown.defaultOptions = {
            "afterClickDropdown": $.noop, // Callback click main
            "afterSelectList": $.noop, // Callback click list
            "onInitComplete": $.noop, // Callback click list
    };

    $.fn.DDown = function(options){
        return this.each(function(){
            (new $.DDown(this, options));
        });
    };

})(jQuery);