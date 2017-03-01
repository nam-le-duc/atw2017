jQuery(document).ready(function($) {
   
   'use strict';
   
	
	//SMOOTH SCROLL
	smoothScroll.init({
		speed: 500, // How fast to complete the scroll in milliseconds
		easing: 'easeInOutCubic', // Easing pattern to use
		updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
		callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
		callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
	 });
	 
	  
	//COUNTDOWN TIMER
	var newYear = new Date(); 
    newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1); 
    $('#countdown').countdown({until: new Date(2014, 12-1, 18)}); // enter event day
    
    $('#removeCountdown').toggle(
        function() {
            $(this).text('Re-attach'); 
            $('#defaultCountdown').countdown('destroy'); 
        }, 
        function() { 
            $(this).text('Remove'); 
            $('#defaultCountdown').countdown({until: newYear}); 
        }
    );
	  
	//MILESTONE
    $('.timer').countTo();
	
	
	//MAGNIFIC POPUP LOAD CONTENT VIA AJAX
	$('.speaker-detail').magnificPopup({type: 'ajax'});
	$('.register').magnificPopup({type: 'ajax'});	
 	
	//MAGNIFIC POPUP IMAGE
	$('.image-link').magnificPopup({type:'image'});	
	
	//OWLCAROUSEL SCHEDULE
	var timetable = $("#timetable");
  var days = $("#days");
 
  timetable.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: false,
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
  });
 
  days.owlCarousel({
   	items : 4,
    itemsMobile       : [479,4],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });
 
  function syncPosition(el){
    var current = this.currentItem;
    $("#days")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#days").data("owlCarousel") !== undefined){
      center(current)
    }
  }
 
  $("#days").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    timetable.trigger("owl.goTo",number);
  });
 
  function center(number){
    var daysvisible = days.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in daysvisible){
      if(num === daysvisible[i]){
        var found = true;
      }
    }
 
    if(found===false){
      if(num>daysvisible[daysvisible.length-1]){
        days.trigger("owl.goTo", num - daysvisible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        days.trigger("owl.goTo", num);
      }
    } else if(num === daysvisible[daysvisible.length-1]){
      days.trigger("owl.goTo", daysvisible[1])
    } else if(num === daysvisible[0]){
      days.trigger("owl.goTo", num-1)
    }
    
  }

	//OWLCAROUSEL GALLERY
	var owl = $(".gallery");
 
	  owl.owlCarousel({
		  itemsCustom : [
			[0, 2],
			[450, 2],
			[600, 4],
			[700, 4],
			[1000, 4],
			[1200, 4],
			[1600, 4]
		  ],
		  navigation : true,
		  navigationText : ['<i class="fa fa-4x fa-chevron-circle-left"></i>','<i class="fa fa-4x  fa-chevron-circle-right"></i>'],
	  });

	  
	//OWLCAROUSEL TESTIMONIAL
	$("#quote").owlCarousel({
 
		pagination : false, 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		navigation : true,
		navigationText : ['<i class="fa fa-3x fa-chevron-circle-left"></i>','<i class="fa fa-3x  fa-chevron-circle-right"></i>'],
	});
	
	
	//FIX HOVER EFFECT ON IOS DEVICES
	document.addEventListener("touchstart", function(){}, true);
	
	

});
	
	



$(window).load(function(){


	function detect_mobile() {
		var mobile = false;
		if (navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPhone/i)) {
			//Page.callMobile();
			mobile = true;
	//    console.log(1);
		}

		if (navigator.userAgent.match(/iPad/i)) {
			//Page.callDesktop();
			mobile = true;
		}

		if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/BlackBerry/i)) {
			/*
			 if(window.innerWidth <= 640){
			 Page.callMobile();
			 }else{
			 Page.callDesktop();
			 } */
			mobile = true;
		}

		if (navigator.userAgent.match(/Windows Phone/i)) {
			/*if(window.innerWidth <= 1024){
			 Page.callMobile();
			 }else{
			 Page.callDesktop();
			 } */
			mobile = true;
		}
		if(window.innerWidth < 1024){
			mobile = true;
		}
		// console.log(navigator.userAgent);
	//  console.log(mobile);
		return mobile
	}


	// ADD SPEAKER

	$(function(){
	  var html = "";
	  $(Object.keys(speakers)).each(function(i,e){
	    var template = $("#template").html();
	    var keys = Object.keys(speakers[e]);
	    template = template.replace("{key}", e);
	    $(keys).each(function(index, key){
	      template = template.replace("{"+key+"}", speakers[e][key]);
	    });
	    html+= template;
	  });
	  $("#content").html(html);
  	})

$( "#dialog" ).dialog({
        autoOpen: false,
        width: '90%',
        maxWidth: 700,
        resizable: false,
   		beforeClose: function( event, ui ) {
   			$(".wrap-popup").addClass("hidden");
   		},
   		open: function( event, ui ) {
   			$(".wrap-popup").removeClass("hidden");
   			$(".wrap-popup").addClass("show");
   		},
    });

$(document).on('touchstart','.open-popup', function(){	
	window.touchmoving = window.pageYOffset;
	console.log(touchmoving);
});

$(document).on('click touchend','.open-popup', function(event){	
	

	if (window.touchmoving != window.pageYOffset && detect_mobile() == true) {
		console.log(window.pageYOffset);
		return;
	}

	else{
		$( "#dialog" ).dialog( "open" );
	$(".ui-dialog-content ").addClass("popup_content");
	event.preventDefault();
    var id = $(this).data('id');
    
    console.log(speakers[id]);
    var speaker = speakers[id];
    var can_show = true;
     $(Object.keys(speaker)).each(function(index, key){
  
     	console.log(speaker['img_src']);
     	if(key == 'img_src'){
			$("#speaker_" + key).attr('src',speaker[key] || '');
     	}else if(key == 'img_alt'){
			$("#speaker_" + key).attr('alt',speaker[key] || '');
     	}else if(key == 'original'){
     		$("#speaker_" + key).attr('data-original-title',speaker[key] || '');
     	}else if(key == 'linkedin'){
     		$("#speaker_" + key).attr('href',speaker[key] || '');
     	} else{
     		$("#speaker_" + key).html(speaker[key] || '');
     	}
     	// if(key == 'description' && ( typeof speaker[key] == 'undefined' || speaker[key].length == 0)){
     	// 	can_show = false;
     	// }
	  });
     if(!can_show) return;
     $('.wrap-popup').addClass('show');

    }
})



	//PARALLAX BACKGROUND
	$(window).stellar({
		horizontalScrolling: false,
	});
    
	
    //PRELOADER
    $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	
	
	//HEADER ANIMATION
	$(window).scroll(function() {
    
$(window).load(function() {


        function detect_mobile() {
            var mobile = false;
            if (navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPhone/i)) {
                //Page.callMobile();
                mobile = true;
                //    console.log(1);
            }

            if (navigator.userAgent.match(/iPad/i)) {
                //Page.callDesktop();
                mobile = true;
            }

            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/BlackBerry/i)) {
				/*
				 if(window.innerWidth <= 640){
				 Page.callMobile();
				 }else{
				 Page.callDesktop();
				 } */
                mobile = true;
            }

            if (navigator.userAgent.match(/Windows Phone/i)) {
				/*if(window.innerWidth <= 1024){
				 Page.callMobile();
				 }else{
				 Page.callDesktop();
				 } */
                mobile = true;
            }
            if (window.innerWidth < 1024) {
                mobile = true;
            }
            // console.log(navigator.userAgent);
            //  console.log(mobile);
            return mobile
        }


<<<<<<< HEAD
		var agendaData = {
  "danang": [
    {
      "TIME": "7:00 - 8:00",
      "HALL ROOM": "REGISTRATION & COFFEE TIME"
    },
    {
      "TIME": "8:00 - 8:15",
      "HALL ROOM": "OPENING PLENARY"
    },
    {
      "TIME": "8:15 - 8:30",
      "HALL ROOM": "REMOTE CALL AND TEA BREAK"
    },
    {
      "TIME": "8:30 - 10:00",
      "HALL ROOM": "TOPIC\r\nSPEAKER\r\nby Kiro Harada\r\nAgile Tour Osaka\r\n\r\n\r\nAre You Killing Mr. Jenkins?\r\nQuang Nguyen\r\nbyTai Huynh\r\nAgile Tour HCMC",
      "WORKSHOP1": "Storytelling' as a transformation tool\r\nEric LARAMÉE\r\nby Martin Goyette\r\nAgile Tour Montreal\r\n"
    },
    {
      "TIME": "10:00 - 10:15",
      "HALL ROOM": "REMOTE CALL"
    },
    {
      "TIME": "10:15 - 11:45",
      "HALL ROOM": "TOPIC\r\nKimble NGO\r\nby Alexandre Cuva\r\nAgile Tour Da Nang\r\n\r\n\r\nHow to start your agile journey\r\nDoi Pham\r\nby himself\r\nAgile Tour Hanoi",
      "WORKSHOP1": "Change your language, change your thinking\r\nStephen Norrvall & Terry Haayema\r\nby Jeremie Benazra\r\nAgile Tour Sydney\r\n"
    },
    {
      "TIME": "11:45 - 13:00",
      "HALL ROOM": "LUNCH TIME AND NETWORKING"
    },
    {
      "TIME": "13:00 - 15:30",
      "HALL ROOM": "TOPIC\r\nCedric MAINGUY\r\nby Sylvain MAHE\r\nAgile Tour Singapore\r\n\r\n\r\nTOPIC\r\nSPEAKER\r\nby ORGA\r\nAgile Tour CITY",
      "WORKSHOP1": "Agile Culture and Organisational Shift\r\nPierre E. Neis\r\nby Hervouet PIERRE\r\nAgile Tour Beirut\r\n"
    },
    {
      "TIME": "15:30 - 15:45",
      "HALL ROOM": "TEA BREAK AND NETWORKING"
    },
    {
      "TIME": "15:45 - 17:15",
      "HALL ROOM": "TOPIC\r\nSPEAKER\r\nby Kulawat Wonsaroj\r\nAgile Tour Bangkok\r\n\r\n\r\nTOPIC\r\nSPEAKER\r\nby Madhur KATHURIA\r\nAgile Tour Pune",
      "WORKSHOP1": "Agile Innovation with JTBD\r\nRicardo TOME\r\nby Patrice PETIT\r\nAgile Tour Paris\r\n"
    },
    {
      "TIME": "17:15 - 17:30",
      "HALL ROOM": "CLOSING PLENARY"
    },
    {
      "TIME": "17:30 - 21:00",
      "HALL ROOM": "BBQ & BDAY PARTY"
    }
  ]
};


 // function renderAgenda(place) {
 //  	var $container = $('[data-place="' + place + '"]');
 //  	$container.empty();
 //  	$.each(agendaData[place], function(index, item) {
 //  		var $tmpAgendaItem = $($('#tmpAgendaItem').html().trim());
 //  		$tmpAgendaItem.find('.time').html(item['TIME']);

 //  		// Columns
 //  		var roomCount = Object.keys(item).length;
 //  		for(var roomIndex = 1; roomIndex < roomCount; roomIndex++) {
 //  			var $tmpColumn = $($('#tmpAgendaColumn').html().trim()),
 //  				key = Object.keys(item)[roomIndex],
 //  				val = item[key].split('\r\n');
  			
 //  			// Heading
 //  			if (val[0] != undefined)
 //  				$tmpColumn.find('.topic-heading').html(val[0]);
 //  			// Topic name
 //  			if (val[1] != undefined)
 //  				$tmpColumn.find('.topic-title').html(val[1]);
 //  			$tmpAgendaItem.find('.description').append($tmpColumn);
 //  		}
 //  		// console.log(Object.keys(item).length);
 //  		// console.log('-----------');
 //  		$container.append($tmpAgendaItem);
 //  	});
 //  }


function renderAgenda(place) {
    var $container = $('[data-place="' + place + '"]');
    $container.empty();
    $.each(agendaData[place], function(index, item) {
      var $tmpAgendaItem = $($('#tmpAgendaItem').html().trim());
      $tmpAgendaItem.find('.time').html(item['TIME']);
      console.log('****************************************************')
      // Columns
      var roomCount = Object.keys(item).length;
      for(var roomIndex = 1; roomIndex < roomCount; roomIndex++) {
        var $tmpColumn = $($('#tmpAgendaColumn').html().trim()),
          key = Object.keys(item)[roomIndex],
          val = item[key].split('\r\n\r\n\r\n');
          console.log('------------------------------ ROOM' + roomIndex);

          for(var subIndex = 0; subIndex < val.length ; subIndex++){
          	if(val[subIndex] != undefined){
                subVal = val[subIndex].split('\r\n');
                console.log('++++subVal');
		        console.log(subVal);
		        console.log('========================');
		        var topic = "";
		        var speaker = "";
		        var des = "";
				var $tmpColumn = $($('#tmpAgendaColumn').html().trim());
          	 	for(var keyIndex = 0; keyIndex < subVal.length; keyIndex++){
          	 		console.log("ROOM " + roomIndex, "keyIndex " + keyIndex);
			        // Heading
			        if (keyIndex == 0 && subVal[keyIndex] != undefined)
			        	topic = subVal[keyIndex];
			        // Topic name
			        else 
			        	speaker+='<p>'+ subVal[keyIndex] +'</p>';
	      			// console.log(val[keyIndex]);
          	  	}
			    $tmpColumn.find('.topic-heading').html(topic);
			    $tmpColumn.find('.topic-title').html(speaker);
			    console.log( $tmpColumn.html());
	        	$tmpAgendaItem.find('.description').append($tmpColumn);
          	}
          }
        console.log($tmpAgendaItem);
      }
      // console.log(Object.keys(item).length);
      // console.log('-----------');
      if(roomCount > 2){
      	$tmpAgendaItem.addClass("double-room");
      }
      $container.append($tmpAgendaItem);
    });
  }
=======
        // ADD SPEAKER

        $(function () {
            var html = "";
            $(Object.keys(speakers)).each(function (i, e) {
                var template = $("#template").html();
                var keys = Object.keys(speakers[e]);
                template = template.replace("{key}", e);
                $(keys).each(function (index, key) {
                    template = template.replace("{" + key + "}", speakers[e][key]);
                });
                html += template;
            });
            $("#content").html(html);
        })

        $("#dialog").dialog({
            autoOpen: false,
            width: '90%',
            maxWidth: 700,
            resizable: false,
            beforeClose: function (event, ui) {
                $(".wrap-popup").addClass("hidden");
            },
            open: function (event, ui) {
                $(".wrap-popup").removeClass("hidden");
                $(".wrap-popup").addClass("show");
            },
        });

        $(document).on('touchstart', '.open-popup', function () {
            window.touchmoving = window.pageYOffset;
        });

        $(document).on('click touchend', '.open-popup', function (event) {
            $("#dialog").dialog("open");
            $(".ui-dialog-content ").addClass("popup_content");
            event.preventDefault();

            if (window.touchmoving != window.pageYOffset && detect_mobile() == true) {
                return;
            }

            else {
                var id = $(this).data('id');

                console.log(speakers[id]);
                var speaker = speakers[id];
                var can_show = true;
                $(Object.keys(speaker)).each(function (index, key) {

                    console.log(speaker['img_src']);
                    if (key == 'img_src') {
                        $("#speaker_" + key).attr('src', speaker[key] || '');
                    } else if (key == 'img_alt') {
                        $("#speaker_" + key).attr('alt', speaker[key] || '');
                    } else if (key == 'original') {
                        $("#speaker_" + key).attr('data-original-title', speaker[key] || '');
                    } else if (key == 'linkedin') {
                        $("#speaker_" + key).attr('href', speaker[key] || '');
                    } else {
                        $("#speaker_" + key).html(speaker[key] || '');
                    }
                    if (key == 'description' && ( typeof speaker[key] == 'undefined' || speaker[key].length == 0)) {
                        can_show = false;
                    }
                });
                if (!can_show) return;
                $('.wrap-popup').addClass('show');

            }
        })


        //PARALLAX BACKGROUND
        $(window).stellar({
            horizontalScrolling: false,
        });


        //PRELOADER
        $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.


        //HEADER ANIMATION
        $(window).scroll(function () {

            if ($(".navbar").offset().top > 50) {
                $(".navbar-fixed-top").addClass("top-nav-collapse");
            } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
            }

            // if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
            // 	$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            // }

        });

        var agendaData = {
            "danang": [
                {
                    "TIME": "7:00 - 8:00",
                    "HALL ROOM": "REGISTRATION & COFFEE TIME"
                },
                {
                    "TIME": "8:00 - 8:15",
                    "HALL ROOM": "OPENING PLENARY"
                },
                {
                    "TIME": "8:15 - 8:30",
                    "HALL ROOM": "REMOTE CALL AND TEA BREAK"
                },
                {
                    "TIME": "8:30 - 10:00",
                    "HALL ROOM": "To come\r\nAgile Tour Osaka\r\n...\r\nQuang Nguyen\r\nAgile Tour HCMC\r\nAre You Killing Mr. Jenkins?",
                    "WORKSHOP 1": "Eric LARAMÉE\r\nAgile Tour Montreal\r\nStorytelling' as a transformation tool"
                },
                {
                    "TIME": "10:00 - 10:15",
                    "HALL ROOM": "REMOTE CALL"
                },
                {
                    "TIME": "10:15 - 11:45",
                    "HALL ROOM": "Kimble NGO\r\nAgile Tour Da Nang\r\n...\r\nDoi Pham\r\nAgile Tour Hanoi\r\nHow to start your agile journey",
                    "WORKSHOP 1": "Stephen Norrvall & Terry Haayema\r\nAgile Tour Sidney\r\nChange your language, change your thinking"
                },
                {
                    "TIME": "11:45 - 13:00",
                    "HALL ROOM": "LUNCH TIME AND NETWORKING"
                },
                {
                    "TIME": "13:00 - 15:30",
                    "HALL ROOM": "Cedric MAINGUY\r\nAgile Tour Singapore\r\n...\r\nTo Come\r\nAgile Tour Osaka\r\n...",
                    "WORKSHOP 1": "Pierre E. Neis\r\nAgile Tour Beirut\r\nAgile Culture and Organisational Shift"
                },
                {
                    "TIME": "15:30 - 15:45",
                    "HALL ROOM": "TEA BREAK AND NETWORKING"
                },
                {
                    "TIME": "15:45 - 17:15",
                    "HALL ROOM": "To come\r\nAgile Tour Bangkok\r\n...\r\nTo Come\r\nAgile Tour Pune\r\n...",
                    "WORKSHOP 1": "To come\r\nAgile Tour Paris\r\n..."
                },
                {
                    "TIME": "17:15 - 17:30",
                    "HALL ROOM": "CLOSING PLENARY"
                },
                {
                    "TIME": "17:30 - 21:00",
                    "BEACH": "BBQ & BDAY PARTY"
                }

            ]
        }
>>>>>>> cb70228df76a4f83033fcbfa8e8bb1df82a59850

        function renderAgenda(place) {
            var $container = $('[data-place="' + place + '"]');
            // Clear container
            $container.empty();

            // each agendaData item is a time point
            $.each(agendaData[place], function (index, item) {
                var $tmpAgendaItem = $($('#tmpAgendaItem').html().trim());

                // Write: time
                $tmpAgendaItem.find('.time').html(item['TIME']);

                // each item here is a room
                var roomCount = Object.keys(item).length;
                for (var roomIndex = 1; roomIndex < roomCount; roomIndex++) {
                    var $tmpColumn = $('<div/>', {'class': 'event-column-dn'});
                    var key = Object.keys(item)[roomIndex],
                        val = item[key].split('\r\n');

                    // each valItem is a text line in cells (include speaker name & topic)
                    $.each(val, function (valIndex, valItem) {
                        if (valItem != undefined) {
                            var $topicItem;
                            switch (valIndex % 4) {
                                case 0:
                                    $topicItem = $('<h3/>', {
                                        'class': 'topic-heading',
                                        'html': valItem
                                    });
                                    break;
                                case 1:
                                    $topicItem = $('<div/>', {
                                        'class': 'topic-title',
                                        'html': valItem
                                    });
                                    break;
                                case 2:
                                    $topicItem = $('<div/>', {
                                        'class': 'topic-title',
                                        'html': valItem
                                    });
                                    break;
                                case 3:
                                    $topicItem = $('<br/>');
                                    break;
                            }
                            $tmpColumn.append($topicItem);
                        }
                        // // Heading
                        // if (val[0] != undefined)
                        //   $tmpColumn.find('.topic-heading').html(val[0]);
                        // // Topic name
                        // if (val[1] != undefined)
                        //   $tmpColumn.find('.topic-title').html(val[1]);
                    });

                    $tmpAgendaItem.find('.description').append($tmpColumn);
                }
                $container.append($tmpAgendaItem);
            });
        }
  //renderAgenda('saigon');
  renderAgenda('danang');
  //renderAgenda('hanoi');

});

	// CONTACT FORM FUNCTION
	var contact_send = function(){
	
	'use strict';
	
	var name  = $("#name").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var type  = $("#type").val();
	
		 if ( name=="" ){ alert("name area is empty!"); $("#name").focus(); }
	else if ( email=="" ){ alert("email address area is empty!"); $("#email").focus(); }
	else if ( phone=="" ){ alert("phone number area is empty!"); $("#phone").focus(); }
	else if ( type=="" ){ alert("register type isn't selected!"); $("#type").focus(); }
	else {
		$.post("contact.send.php", { name:name, email:email, phone:phone, type:type }, function( result ){
			if ( result=="SUCCESS" ){
				alert("Your contact form is sent.");
				setTimeout(function(){
					$("#name").val("");
					$("#email").val("");
					$("#phone").val("");
					$("#type").val("");
				}, 3000);
			} else {
				alert("Your contact form isn't sent. Please check fields and try again.");
			}
		});
	}

};

	/* Newsletter Functions */
	var newsletter_send = function(){
	
		'use strict';
		
		var email 	= $("#newsletter_email").val();
		if ( email=="" ){ alert("Your email address is empty!"); $("#newsletter_email").focus(); }
		else {
			$.post("newsletter.send.php", { email:email }, function( result ){
				
				console.log( result );
				
				if ( result=="SUCCESS" ){
					alert("Thank you. Your email is added to our database.");
					setTimeout(function(){ $("#newsletter_email").val(""); }, 3000);
				}
				
				else if ( result=="EXIST" ){
					alert("Error. Your email address is already exist our database.");
					$("#newsletter_email").focus();
				}
				
				else {
					alert("Error. Your email isn't added to our database.");
					$("#newsletter_email").focus();
				}
				
			});
		}
	
	};



	

	

	//GOOGLE MAP
	function init_map() {
    var myOptions = {
        zoom: 14,
        center: new google.maps.LatLng(16.0386529,108.2497546), //change the coordinates
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
    };
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(16.0386529,108.2497546) //change the coordinates
    });
    infowindow = new google.maps.InfoWindow({
        content: "<b>Agile{Tour}World</b>, Danang City, Vietnam. "  //add your address
    });
    google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
	}
	google.maps.event.addDomListener(window, 'load', init_map);





	

	