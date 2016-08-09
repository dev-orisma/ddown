DDown
=======

DDown is plugin javascript for create drop down list from HTML.

##Instructions

1.Load the jQuery core on your page. Something like
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>
```

jQuery must appear BEFORE DDown in your HTML document. 

2.Load the DDown plugin.
```html
<script type="text/javascript"   src="js/ddown.js"></script> 
```

3.Call DDown on your .dropdown-list div, You can identify by id (#normal).
```javascript
$("#normal .dropdown-list").DDown({
        afterSelectList: function(elm,list,firstInit){
            var dataVal = list.data("val"); 
        }
    });
```

##Changelog

- Add function search data by text on event keypress (ddown.js line 95).