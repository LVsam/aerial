define(function (require) {
	'use strict';

	var TEST_CONTEXTS = {

		// Kev's mangled account 
		k_con: 'ca3c9beff71cd8a6b80a7ab0abcbc06a',

		// No accounts linked, good for non-linked budget flow 
		new_user: 'e6c455da1125de3352d3ab5f88924ae3',

		// One investment account, very minimal transactions, can have goals 
		sparse_transactions: '74fa710fcbc24ba51a3c6602afb5f3e1',

		// Investment, Checking/Savings, Credit Cards, 1200+ Transactions 
		high_activity: 'ec676a7c0dd88aa5150727501b851074',

		// Once credit card, transactions going back to 11/17/2011 
		november_to_now: '2de6f47e36325b0d76edea59bf99d704',

		// One investment account, only one transaction 
		poor_johnny_one_trans: '0186dd7ba5fb4d964a82c0a953b77685',

		// Use for Planner View as Caller Context with k_con 
		effy: '3ad2ee8893d635b9fb92e0baf6cb41ae',
		
		// Ainslie's Context 
		ainslie: '3cf554cd0792fa4570a1ce2df4a1d454',

		// No Accounts Linked 
		noAccounts: 'd01c1f5efef2703ef58d336ea70860de',

		// Linking Test Context 
		linking: 'd01c1f5efef2703ef58d336ea70860de'
	};

	// These are default developer overrides
	// Copy this file to environment.js
	return {
		header: {
			userContext: TEST_CONTEXTS.k_con
		},
		servicesBaseURI: 'api',
		services: {
			articles: '../../wp-content/plugins/article_service'
		},
		pollers: {
			alerts: {
				enabled: true
			},
			viewing: {
				enabled: true
			},
			session: {
				enabled: true
			}
		},
		analytics: {
			enabled: true,
			useQueue: true,
			queueInterval: 15000
		},
		cache: {
			cacheBuster: true
		},
		ga: {
			enabled: false
		},
		debug: {
			enabled: true
		},
		fullSlate: {
			production: false
		},
		plannerViewTesting: false
	};
});