define(['jquery', 'underscore', 'error', 'cookie', 'debug', 'utils'], function ($, _, ErrorInstance, cookie, debug, Utils) {
	'use strict';

	var env = {
		// AJAX Header
		header: {
			accept: 'application/json',
			contentType: 'application/json'
		},
		// Services
		serviceVersion: '20121201',
		serverRoot: '',
		servicesBaseURI: 'api',
		services: {
			account: 'account',
			accounts: 'accounts',
			accountsFull: 'accounts',
			alerts: 'alerts',
			analytics: 'track',
			analyticsBatch: 'tracks',
			articles: 'content/articles',
			budgetSummary: 'folders',
			charts: 'folders',
			folders: 'folders',
			goal: 'goal',
			goals: 'goals',
			goalsHistory: 'trends/goals',
			goalsProjections: 'goals/projections',
			sites: 'sites',
			sitesFix: 'sites/fix',
			sitesLink: 'sites/link',
			sitesMfa: 'sites/mfa',
			sitesRefresh: 'sites/refresh',
			sitesSearch: 'sites/search',
			splitTransactions: 'transactions/split',
			transactions: 'transactions',
			transactionsMeta: 'transactions/meta',
			trendsBalances: 'trends/balances',
			trendsFlow: 'trends/flow',
			userProduct: 'user/product',
			userProfile: 'user/profile',
			userSubs: 'user/subs',
			userViewing: 'user/viewing'

		},
		// Locale
		locale: {
			tooltips: '/fe/locale/EN/Tooltips.json'
		},

		//Popular Accounts
		popularAccounts: '/fe/locale/EN/popularAccounts.json',

		// AJAX Pollers
		pollers: {
			alerts: {
				enabled: true,
				interval: 30000
			},
			viewing: {
				enabled: true,
				initial: 30000,
				activity: 5000
			},
			session: {
				enabled: true,
				initial: 720000,
				// 12min
				activity: 30000
			}
		},
		useNewLinkingFlow: true,
		plannerViewTesting: false,
		// Analytics
		analytics: {
			enabled: true,
			useQueue: true,
			queueInterval: 3000
		},
		// Caching
		cache: {
			enabled: true,
			cacheBuster: false
		},
		// Google Analytics
		ga: {
			accountId: '',
			enabled: false,
			varName: '_gaq'
		},
		// Debugging
		debug: {
			enabled: false
		},
		fullSlate: {
			production: false
		}
	};

	/*
	 * URL = http://[serverRoot]/[servicesBaseURI]/[services]
	 *
	 * cache: Controls whether backbone will cache models
	 *
	 * debug: Controls whether the debug-console is enabled or disabled
	 *
	 */

	return function (envOverride, global) {
		// Extend override with Environment Settings
		Utils.deepExtend(env, envOverride);

		var root = env.serverRoot;
		var base = env.servicesBaseURI;
		var services = env.services;
		var version = env.serviceVersion;

		_.each(_.keys(services), function (service) {
			services[service] = [root, base, version, services[service]].join('/');
		});

		// Environment Setting Cookies
		var cookie = {
			callerContext: $.cookie('NUMBAT'),
			userContext: $.cookie('PLATYPUS'),
			xSession: $.cookie('WOMBAT'),
			xToken: $.cookie('ECHIDNA'),
			debug: $.cookie('BILBY')
		};

		// PlannerViewing
		var userContext = cookie.userContext || env.header.userContext;
		env.isPlanner = !_.isNull(cookie.callerContext) && userContext !== cookie.callerContext;

		// AJAX
		$.ajaxSetup({
			beforeSend: function (xhr, settings) {
				xhr.setRequestHeader('Accept', env.header.accept);
				xhr.setRequestHeader('User-Context', userContext);
				if(cookie.callerContext) {
					xhr.setRequestHeader('Caller-Context', cookie.callerContext);
				}
				if(cookie.xSession) {
					xhr.setRequestHeader('X-Session', cookie.xSession);
				}
				if(cookie.xToken) {
					xhr.setRequestHeader('X-Token', cookie.xToken);
				}
				if(settings.type === 'PUT' || settings.type === 'POST') {
					xhr.setRequestHeader('Content-Type', env.header.contentType);
				}
			},
			cache: !env.cache.cacheBuster
		});

		/**
		* Global ajax handler, only handles 409, logs user out.
		* 
		* Will eventually be moved to a central error handling place
		* Mike S. said this was the best place for it now. 12/14/12
		*/
		$(window.document).ajaxError(function (evt, jqXHR, settings) {
			if (jqXHR.status === 409) {
				global.App.SessionTimer.logout();
			}
		});

		// Debugging
		if(!(cookie.debug || env.debug.enabled) || !global.console) {
			global.console = {
				log: function () {}
			};
			debug.setLevel(0);
		}

		// Cache Buster
		if(env.cache.cacheBuster) {
			require.config({
				urlArgs: '_=' + (+new Date())
			});
		}

		// Goggle Analytics
		env.ga.gaq = global._gaq = [];

		return {
			environment: env
		};
	};
});
