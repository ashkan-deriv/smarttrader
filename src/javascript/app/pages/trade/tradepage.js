const Dropdown          = require('binary-style').selectDropdown;
const TradingAnalysis   = require('./analysis');
const commonTrading     = require('./common');
const cleanupChart      = require('./charts/webtrader_chart').cleanupChart;
const displayCurrencies = require('./currency');
const Defaults          = require('./defaults');
const TradingEvents     = require('./event');
const Price             = require('./price');
const Process           = require('./process');
const ViewPopup         = require('../user/view_popup/view_popup');
const BinaryPjax        = require('../../base/binary_pjax');
const Client            = require('../../base/client');
const Header            = require('../../base/header');
const BinarySocket      = require('../../base/socket');
const Guide             = require('../../common/guide');
const State             = require('../../../_common/storage').State;

const TradePage = (() => {
    let events_initialized = 0;
    State.remove('is_trading');

    const onLoad = () => {
        BinarySocket.wait('authorize').then(() => {
            init();
        });
    };

    const init = () => {
        if (Client.isJPClient()) {
            BinaryPjax.load('multi_barriers_trading');
            return;
        }
        State.set('is_trading', true);
        Price.clearFormId();
        if (events_initialized === 0) {
            events_initialized = 1;
            TradingEvents.init();
        }

        Dropdown('#amount_type');

        BinarySocket.wait('authorize').then(() => {
            if (Client.get('is_virtual')) {
                Header.upgradeMessageVisibility(); // To handle the upgrade buttons visibility
            }
            Client.activateByClientType('trading_socket_container');
            BinarySocket.send({ payout_currencies: 1 }).then(() => {
                displayCurrencies();
                Dropdown('#currency', true);
                if (document.getElementById('multiplier_currency').tagName === 'SELECT') {
                    Dropdown('#multiplier_currency', true);
                }
                Process.processActiveSymbols();
            });
        });

        if (document.getElementById('websocket_form')) {
            commonTrading.addEventListenerForm();
        }

        // Walk-through Guide
        Guide.init({
            script: 'trading',
        });
        TradingAnalysis.bindAnalysisTabEvent();

        ViewPopup.viewButtonOnClick('#contract_confirmation_container');
    };

    const reload = () => {
        sessionStorage.removeItem('underlying');
        window.location.reload();
    };

    const onUnload = () => {
        State.remove('is_trading');
        events_initialized = 0;
        Process.forgetTradingStreams();
        BinarySocket.clear();
        Defaults.clear();
        cleanupChart();
        commonTrading.clean();
        BinarySocket.clear('active_symbols');
        TradingAnalysis.onUnload();
    };

    const onDisconnect = () => {
        commonTrading.showPriceOverlay();
        commonTrading.showFormOverlay();
        cleanupChart();
        onLoad();
    };

    return {
        onLoad,
        reload,
        onUnload,
        onDisconnect,
    };
})();

module.exports = TradePage;
