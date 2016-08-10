//tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$('.fab').hover(function () {
    $(this).toggleClass('active');
});
//Button components
$(document).on('click', '[data-toggle^="class"]',
function(e) {
	e && e.preventDefault();
	var $this = $(e.target),
	$class,
	$target,
	$tmp,
	$classes,
	$targets; ! $this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
	$class = $this.data()['toggle'];
	$target = $this.data('target') || $this.attr('href');
	$class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
	$target && ($targets = $target.split(','));
	$classes && $classes.length && $.each($targets,
	function(index, value) {
		if ($classes[index].indexOf('*') !== -1) {
			var patt = new RegExp('\\s' + $classes[index].replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
			$($this).each(function(i, it) {
				var cn = ' ' + it.className + ' ';
				while (patt.test(cn)) {
					cn = cn.replace(patt, ' ');
				}
				it.className = $.trim(cn);
			});
		} ($targets[index] != '#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
	});
	$this.toggleClass('active');
});
/*********************************************
*bootstrap panel extend
******************************************/
// panel toggle
$(document).on('click', '.panel-toggle',
function(e) {
	e && e.preventDefault();
	var $this = $(e.target),
	$class = 'collapse',
	$target;
	if (!$this.is('a')) $this = $this.closest('a');
	$target = $this.closest('.panel');
	$target.find('.panel-body').toggleClass($class);
	$this.toggleClass('active');
});

// panel remove
$(document).on('click', '.panel-remove',
function(e) {
	e && e.preventDefault();
	var $this = $(e.target),
	$class = 'collapse',
	$target;
	if (!$this.is('a')) $this = $this.closest('a');
	$target = $this.closest('.panel').addClass('hide');
});

/*Panel Slidy Footer*/
$(function(){
$('.Panel-slidy').hover(function(){
        $(this).find('.panel-footer').slideDown(250);
    },function(){
        $(this).find('.panel-footer').slideUp(250); //.fadeOut(205)
    });
})

//panel filter
/**
*   I don't recommend using this plugin on large tables, I just wrote it to make the demo useable. It will work fine for smaller tables 
*   but will likely encounter performance issues on larger tables.
*
*		<input type="text" class="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
*		$(input-element).filterTable()
*		
*	The important attributes are 'data-action="filter"' and 'data-filters="#table-selector"'
*/
$(function(){
    'use strict';
	var $ = jQuery;
	$.fn.extend({
		filterTable: function(){
			return this.each(function(){
				$(this).on('keyup', function(e){
					$('.filterTable_no_results').remove();
					var $this = $(this), search = $this.val().toLowerCase(), target = $this.attr('data-filters'), $target = $(target), $rows = $target.find('tbody tr');
					if(search == '') {
						$rows.show(); 
					} else {
						$rows.each(function(){
							var $this = $(this);
							$this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
						})
						if($target.find('tbody tr:visible').size() === 0) {
							var col_count = $target.find('tr').first().find('td').size();
							var no_results = $('<tr class="filterTable_no_results"><td colspan="'+col_count+'">No results found</td></tr>')
							$target.find('tbody').append(no_results);
						}
					}
				});
			});
		}
	});
	$('[data-action="filter"]').filterTable();
});

$(function(){
    // attach table filter plugin to inputs
	$('[data-action="filter"]').filterTable();
	
	$('.container').on('click', '.panel-heading span.filter', function(e){
		var $this = $(this), 
				$panel = $this.parents('.panel');
		
		$panel.find('.panel-body').slideToggle();
		if($this.css('display') != 'none') {
			$panel.find('.panel-body input').focus();
		}
	});
	$('[data-toggle="tooltip"]').tooltip();
})
/*panel filter end*/
/*Panel table with filters (per column)*/
$(function(){
    $('.filterable .btn-filter').click(function(){
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function(e){
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
        }
    });
});
/*Panel table with filters (per column) end*/
/*
* Simple Navbar Search
* By http://bootsnipp.com/
*/	
$(function() {
    // Remove Search if user Resets Form or hits Escape!
    $('body, .simple-search-navbar form[role="search"] button[type="reset"]').on('click keyup',
    function(event) {
        //console.log(event.currentTarget);
        if (event.which == 27 && $('.simple-search-navbar form[role="search"]').hasClass('active') || $(event.currentTarget).attr('type') == 'reset') {
            closeSearch();
        }
    });

    function closeSearch() {
        var $form = $('.simple-search-navbar form[role="search"].active'); 
		$form.find('input').val('');
        $form.removeClass('active');
    }

    // Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
    $(document).on('click', '.simple-search-navbar form[role="search"]:not(.active) button[type="submit"]',
    function(event) {
        event.preventDefault();
        var $form = $(this).closest('form'),
        $input = $form.find('input');
        $form.addClass('active');
        $input.focus();

    });
    // ONLY FOR DEMO // Please use $('form').submit(function(event)) to track from submission
    // if your form is ajax remember to call `closeSearch()` to close the search container
    $(document).on('click', '.simple-search-navbar form[role="search"].active button[type="submit"]',
    function(event) {
        event.preventDefault();
        var $form = $(this).closest('form'),
        $input = $form.find('input');
        $('#showSearchTerm').text($input.val());
        closeSearch()
    });
});


/*
* Full Screen Search - Bootsnipp.com
* By http://bootsnipp.com/snippets/featured/full-screen-search
*/	
$(function() {
    $('a[href="#fullsearch"]').on('click',
    function(event) {
        event.preventDefault();
        $('.fullsearch').addClass('open');
        $('.fullsearch > form > input[type="search"]').focus();
    });

    $('.fullsearch, .fullsearch button.close').on('click keyup',
    function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });

    $('form').submit(function(event) {
        event.preventDefault();
        return false;
    })
});


/*
* Svbtle Inspired Menu
* By http://bootsnipp.com/snippets/featured/svbtle-inspired-menu
*/
$(function() {
    $('.svbtl-menu, .nav-controller').on('click', function(event) {
        $('.svbtl-menu').toggleClass('focus');
    });
    $('.svbtl-menu, .nav-controller').on('mouseover', function(event) {
        $('.svbtl-menu').addClass('focus');
    }).on('mouseout', function(event) {
        $('.svbtl-menu').removeClass('focus');
    })
})


/*
* Minimal Menu
* By http://bootsnipp.com/snippets/featured/minimal-menu
*/
$(function () {
    /* START OF DEMO JS - NOT NEEDED */
    if (window.location == window.parent.location) {
        $('#fullscreen').html('<span class="glyphicon glyphicon-resize-small"></span>');
        $('#fullscreen').attr('href', 'http://bootsnipp.com/mouse0270/snippets/PbDb5');
        $('#fullscreen').attr('title', 'Back To Bootsnipp');
    }    
    $('#fullscreen').on('click', function(event) {
        event.preventDefault();
        window.parent.location =  $('#fullscreen').attr('href');
    });
    $('#fullscreen').tooltip();
    /* END DEMO OF JS */
    
    $('.navbar-toggler').on('click', function(event) {
		event.preventDefault();
		$(this).closest('.navbar-minimal').toggleClass('open');
	})
});


/*
* navbar lateral slide menu
* http://bootsnipp.com/snippets/featured/navbar-lateral-slide-menu
*/
$(function () {
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function(event) {
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
    });
});

/*
* navbar fullpage dropdown
* by iwebued.com
*/
$(function () {
    var sideslider = $('[data-toggle-style=fulldropdown]');
    sideslider.click(function(event) {
        $('body').toggleClass('fulldropdown');
    });
    $(window).resize(function() {
        $('body').removeClass('fulldropdown');
		$('header .navbar-collapse').removeClass('in');
    })
});

/*
* Timeline 2.1 with images and responsive
* By http://bootsnipp.com/snippets/featured/timeline-21-with-images-and-responsive
*/
$(function () {
	var my_posts = $("[rel=tooltip]");

	var size = $(window).width();
	for(i=0;i<my_posts.length;i++){
		the_post = $(my_posts[i]);

		if(the_post.hasClass('invert') && size >=767 ){
			the_post.tooltip({ placement: 'left'});
			the_post.css("cursor","pointer");
		}else{
			the_post.tooltip({ placement: 'rigth'});
			the_post.css("cursor","pointer");
		}
	}
});


/*
* Link to top page
* By http://bootsnipp.com/snippets/featured/link-to-top-page
*/
$(function () {
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#backto-top').fadeIn();
            } else {
                $('#backto-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#backto-top').click(function () {
            $('#backto-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        //$('#backto-top').hover.tooltip('show');
});


/*
* responsive-breadcrumbs响应式面包屑导航
* By http://bootsnipp.com/snippets/featured/responsive-breadcrumbs
*/
$(function () {
    $(window).resize(function() {

        ellipses1 = $(".responsive-breadcrumb :nth-child(2)")
        if ($(".responsive-breadcrumb a:hidden").length >0) {ellipses1.show()} else {ellipses1.hide()}
        
        //ellipses2 = $("#bc2 :nth-child(2)")
        //if ($("#bc2 a:hidden").length >0) {ellipses2.show()} else {ellipses2.hide()}
        
    })
    
});

/*
* Search Panel with filters
* By http://bootsnipp.com/snippets/featured/search-panel-with-filters
*/
$(function () {
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
	});
});