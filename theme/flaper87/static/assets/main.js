/* Carrd Core JS | carrd.co | License: MIT */

var	on = addEventListener,
	$ = function(q) { return document.querySelector(q) },
	$$ = function(q) { return document.querySelectorAll(q) },
	$body = document.body,
	$inner = $('.inner'),
	client = (function() {

		var o = {
				browser: 'other',
				browserVersion: 0,
				os: 'other',
				osVersion: 0
			},
			ua = navigator.userAgent,
			a, i;

		// browser, browserVersion.
			a = [
				['firefox',		/Firefox\/([0-9\.]+)/],
				['edge',		/Edge\/([0-9\.]+)/],
				['safari',		/Version\/([0-9\.]+).+Safari/],
				['chrome',		/Chrome\/([0-9\.]+)/],
				['ie',			/Trident\/.+rv:([0-9]+)/]
			];

			for (i=0; i < a.length; i++) {

				if (ua.match(a[i][1])) {

					o.browser = a[i][0];
					o.browserVersion = parseFloat(RegExp.$1);

					break;

				}

			}

		// os, osVersion.
			a = [
				['ios',			/([0-9_]+) like Mac OS X/,			function(v) { return v.replace('_', '.').replace('_', ''); }],
				['ios',			/CPU like Mac OS X/,				function(v) { return 0 }],
				['android',		/Android ([0-9\.]+)/,				null],
				['mac',			/Macintosh.+Mac OS X ([0-9_]+)/,	function(v) { return v.replace('_', '.').replace('_', ''); }],
				['windows',		/Windows NT ([0-9\.]+)/,			null]
			];

			for (i=0; i < a.length; i++) {

				if (ua.match(a[i][1])) {

					o.os = a[i][0];
					o.osVersion = parseFloat( a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1 );

					break;

				}

			}

		return o;

	}()),
	trigger = function(t) {

		if (client.browser == 'ie') {

			var e = document.createEvent('Event');
			e.initEvent(t, false, true);
			dispatchEvent(e);

		}
		else
			dispatchEvent(new Event(t));

	};

// Animation.
	on('load', function() {
		setTimeout(function() {
			$body.className = $body.className.replace(/\bis-loading\b/, 'is-playing');

			setTimeout(function() {
				$body.className = $body.className.replace(/\bis-playing\b/, 'is-ready');
			}, 2000);
		}, 100);
	});

// Sections.
	var h, id, ee, k, locked = false;

	// Initialize.

		// Set scroll restoration to manual.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';

       // Get current section.
       h = location.hash;

       if (location.pathname.endsWith('.html') && !location.pathname.endsWith('/index.html')) {
          h = '#one'
       }

			id = h && $('section[id="' + h.substr(1) + '-section"]') ? h.substr(1) : 'home';

		// Deactivate all sections except current.
			ee = $$('section:not([id="' + id + '-section"])');

			for (k = 0; k < ee.length; k++) {

				ee[k].className = 'inactive';
				ee[k].style.display = 'none';

			}

		// Activate current.
			$('section[id="' + id + '-section"]').classList.add('active');

		// Reset scroll.
			setTimeout(function() {
				$body.scrollTop = document.documentElement.scrollTop = 0;
			}, 75);

	// Hashchange event.
		on('hashchange', function(event) {

			var h, e, ce, eh, ceh, k;

			// Get target section.
				h = (location.hash ? location.hash : '#home');
				e = $(h + '-section');

				// Doesn't exist or already active? Bail.
					if (!e || !e.classList.contains('inactive'))
						return false;

			// Lock.
				if (locked)
					return false;

				locked = true;

			// Clear "home" URL hash.
				if (h == '#home')
					history.replaceState(null, null, '#');

			// Deactivate current section.
				ce = $('section:not(.inactive)');

				if (ce) {

					// Get current height.
						ceh = ce.offsetHeight;

					// Deactivate.
						ce.classList.add('inactive');

					// Hide.
						setTimeout(function() {
							ce.style.display = 'none';
							ce.classList.remove('active');
						}, 250);

				}

			// Activate target section.
				setTimeout(function() {

					// Turn off overflow.
						$inner.style.overflow = 'hidden';

					// Show.
						e.style.display = '';

					// Trigger 'resize' event.
						trigger('resize');

					// Reset scroll.
						$body.scrollTop = document.documentElement.scrollTop = 0;

					// Get target height.
						eh = e.offsetHeight;

					// Set target heights.
						if (eh > ceh) {

							e.style.maxHeight = ceh + 'px';
							e.style.minHeight = '0';

						}
						else {

							e.style.maxHeight = '';
							e.style.minHeight = ceh + 'px';

						}

					setTimeout(function() {

						// Activate.
							e.classList.remove('inactive');
							e.classList.add('active');

						// Temporarily restore target heights.
							e.style.minHeight = eh + 'px';
							e.style.maxHeight = eh + 'px';

						setTimeout(function() {

							// Turn off transitions.
								e.style.transition = 'none';

							// Clear target heights.
								e.style.minHeight = '';
								e.style.maxHeight = '';

							setTimeout(function() {

								// Turn on transitions.
									e.style.transition = '';

								// Turn on overflow.
									$inner.style.overflow = '';

								// Unlock.
									locked = false;

							}, 75);

						}, 500);

					}, 75);

				}, 250);

			return false;

		});

// Platform-specific hacks.

	// Init.
		var style, sheet, rule;

		// Create <style> element.
			style = document.createElement('style');
			style.appendChild(document.createTextNode(''));
			document.head.appendChild(style);

		// Get sheet.
			sheet = style.sheet;

	// Android.
		if (client.os == 'android') {

			// Prevent background "jump" when address bar shrinks.
			// Specifically, this fix forces the background pseudoelement to a fixed height based on the physical
			// screen size instead of relying on "vh" (which is subject to change when the scrollbar shrinks/grows).
				(function() {

					// Insert and get rule.
						sheet.insertRule('body::after { }', 0);
						rule = sheet.cssRules[0];

					// Event.
						var f = function() {
							rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
						};

						on('load', f);
						on('orientationchange', f);
						on('touchmove', f);

				})();

		}

	// iOS.
		else if (client.os == 'ios') {

			// Prevent white bar below background when address bar shrinks.
			// For some reason, simply forcing GPU acceleration on the background pseudoelement fixes this.
				(function() {

					// Insert and get rule.
						sheet.insertRule('body::after { }', 0);
						rule = sheet.cssRules[0];

					// Set rule.
						rule.style.cssText = '-webkit-transform: scale(1.0)';

				})();

			// Prevent white bar below background when form inputs are focused.
			// Fixed-position elements seem to lose their fixed-ness when this happens, which is a problem
			// because our backgrounds fall into this category.
				(function() {

					// Insert and get rule.
						sheet.insertRule('body.ios-focus-fix::before { }', 0);
						rule = sheet.cssRules[0];

					// Set rule.
						rule.style.cssText = 'height: calc(100% + 60px)';

					// Add event listeners.
						on('focus', function(event) {
							$body.classList.add('ios-focus-fix');
						}, true);

						on('blur', function(event) {
							$body.classList.remove('ios-focus-fix');
						}, true);

				})();

		}

	// IE.
		else if (client.browser == 'ie') {

			// Flexbox workaround.
			// IE's flexbox implementation doesn't work when 'min-height' is used, so we can work around this
			// by switching to 'height' but simulating the behavior of 'min-height' via JS.
				(function() {
					var t, f;

					// Handler function.
						f = function() {

							var x = $('#wrapper');

							x.style.height = 'auto';

							if (x.scrollHeight <= innerHeight)
								x.style.height = '100vh';

						};

					// Do an initial call of the handler.
						(f)();

					// Add event listeners.
						on('resize', function() {

							clearTimeout(t);

							t = setTimeout(f, 250);

						});

						on('load', f);

				})();

		}
