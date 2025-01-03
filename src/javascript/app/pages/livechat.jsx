import React from 'react';
import ReactDOM from 'react-dom';
import useFreshChat from '../hooks/useFreshChat';
import useGrowthbookGetFeatureValue from '../hooks/useGrowthbookGetFeatureValue';

const LiveChat = ({ cs_live_chat }) => {

    const loginid      = localStorage.getItem('active_loginid');
    const client_info  = loginid && JSON.parse(localStorage.getItem('client.accounts') || '{}')[loginid];
    const token        = client_info?.token ?? null;

    const [isFreshChatEnabled] = useGrowthbookGetFeatureValue({
        featureFlag: 'enable_freshworks_live_chat',
    });
    useFreshChat(token);

    if (!isFreshChatEnabled && !cs_live_chat) return null;

    return (
        <React.Fragment>
            {!isFreshChatEnabled && <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.__lc = window.__lc || {};
                        window.__lc.license = 12049137;
                        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can’t use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
                    `,
                }}
                defer
            />}
            <div id='livechat'>
                <img id='livechat__logo' />
            </div>
        </React.Fragment>
    );
};

export const init = (cs_chat_livechat) => {
    ReactDOM.render(
        <LiveChat cs_live_chat={cs_chat_livechat} />,
        document.getElementById('deriv_livechat')
    );
};

export default init;
