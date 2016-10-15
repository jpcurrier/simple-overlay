$( window ).on( 'resize', function(){
	if( $( '.overlay' ).length )
		overlaySizing();
} );

// overlay
function overlaySizing(){
	var figurePadH =
		parseInt( $( '.overlay figure' ).css( 'padding-right' ), 10 ) +
		parseInt( $( '.overlay figure' ).css( 'padding-left' ), 10 );
	var figurePadV =
		parseInt( $( '.overlay figure' ).css( 'padding-top' ), 10 ) +
		parseInt( $( '.overlay figure' ).css( 'padding-bottom' ), 10 );
	var overlayWidth =
		$( window ).width() - (
			parseInt( $( '.overlay' ).css( 'padding-right' ), 10 ) +
			parseInt( $( '.overlay' ).css( 'padding-left' ), 10 ) +
			figurePadH
		);
	var overlayHeight =
		$( window ).height() - (
			parseInt( $( '.overlay' ).css( 'padding-top' ), 10 ) +
			parseInt( $( '.overlay' ).css( 'padding-bottom' ), 10 ) +
			figurePadV
		);

	$( '.overlay' ).each( function(){
		var figureWidth = Number( $( this ).find( 'figure' ).attr( 'data-natural-width' ) );
		var figureHeight = Number( $( this ).find( 'figure' ).attr( 'data-natural-height' ) );

		// figure width extends beyond overlay & extends further than figure height
		if(
			( overlayWidth - figureWidth < 0 ) &&
			( overlayWidth - figureWidth < overlayHeight - figureHeight )
		){
			$( this ).find( 'figure' ).css({
				'width': '100%',
				'height': figureHeight * ( overlayWidth / figureWidth ) + figurePadV
			});
		}
		// figure height extends beyond overlay, further than figure width
		else if( overlayHeight - figureHeight < 0 ){
			$( this ).find( 'figure' ).css({
				'width': figureWidth * ( overlayHeight / figureHeight ) + figurePadH,
				'height': '100%'
			});
		}
		// figure does not extend beyond overlay
		else{
			$( this ).find( 'figure' ).css({
				'width': figureWidth + figurePadH,
				'height': figureHeight + figurePadV
			});
		}
	} );
}
( function( $ ){
	$.fn.overlay = function( options ){

		// default options
		var settings = $.extend({
			open: 'href'
		}, options );

		var id = 1;

		return this.each( function(){
			var overlay = 'overlay-' + id,
				src = $( this ).attr( 'href' );

			// create
			var img = new Image();
			img.onload = function(){
				$( 'body' ).append(
					'<div class="overlay ' + overlay + '">' +
						'<div>' +
							'<figure data-natural-width="' + this.width + '" data-natural-height="' + this.height + '">' +
								'<img src="' + src + '">' +
								'<button class="close" type="button"></button>' +
							'</figure>' +
						'</div>' +
					'</div>'
				);
			}
			img.src = src;

			// open
			$( this ).on( 'click', function( e ){
				e.preventDefault();

				$( 'body' ).addClass( 'overlay-open' );

				$( '.' + overlay ).css({
					'display': 'block',
					'opacity': 0
				});
				overlaySizing();
				$( '.' + overlay ).animate({
					'opacity': 1
				});

			} );

			// close
			function closeOverlay(){
				$( 'body' ).removeClass( 'overlay-open' );
				$( '.overlay' ).fadeOut( 200 );
			}
			$( document ).on( 'click', '.overlay figure', function( e ){
				e.stopPropagation();
			} );
			$( document ).on( 'click', '.overlay, .overlay .close', function(){
				closeOverlay();
			} );
			$( document ).on( 'keydown', function( e ){
				if( e.keyCode == 27 ){
					closeOverlay();
				}
			});

			id++;
		} );
	};
} )( jQuery );

// init overlay
$( '.launch-overlay > a, .launch-overlay' ).overlay();