import React from 'react';
import SeparatorLine from '../../_common/components/separator_line.jsx';

const DepositWithdraw = ({ id, is_payment_agent, show_upgrade }) => (
    <div className='gr-2 gr-12-m'>
        <SeparatorLine className='gr-parent gr-hide gr-show-m gr-padding-10' invisible />
        <div className='gr-row gr-row-align-left gr-row-align-right-m'>
            <div className='gr-adapt gr-no-gutter-m client_real invisible gr-parent'>
                <a className='toggle button client_real invisible' href={it.url_for(is_payment_agent ? '/cashier/payment_agent_listws' : '/cashier/forwardws?action=deposit')} id={id}>
                    <span className='deposit'>{it.L('Deposit')}</span>
                </a>
            </div>
            <div className='gr-adapt client_real invisible'>
                <a className='toggle button client_real invisible' href={it.url_for(is_payment_agent ? '/paymentagent/withdrawws' : '/cashier/forwardws?action=withdraw')}>
                    <span className='withdraw'>{it.L('Withdraw')}</span>
                </a>
            </div>
            { show_upgrade &&
                <div className='gr-adapt invisible upgrademessage'>
                    <a className='button' />
                </div>
            }
        </div>
    </div>
);

export const CashierNote = ({ text, className }) => (
    <div className={`gr-padding-10 gr-child invisible cashier_note ${className}`}>
        <div className='gr-12 color-dark-white'>
            <div className='gr-row gr-row-align-middle'>
                <div className='gr-adapt gr-1-m gr-no-gutter-left'>
                    <div className='notice-circle faded'>i</div>
                </div>
                <div className='gr-11 gr-9-t gr-9-p gr-11-m gr-no-gutter align-start'>
                    <p className='no-margin'>
                        {text}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const Cashier = () => (
    <React.Fragment>
        <h1>{it.L('Cashier')}</h1>

        <div className='invisible' id='message_bitcoin_cash'>
            <div className='notice-msg center-text'>
                <div className='gr-padding-10'>{it.L('Please note that you are currently using your [_1]Bitcoin Cash[_2] account. You can only fund your account in [_1]Bitcoin Cash[_2], and not Bitcoin.', '<a href="https://www.bitcoincash.org" target="_blank" rel="noopener noreferrer">', '</a>')}</div>
            </div>
        </div>

        <div className='invisible' id='message_cashier_unavailable'>
            <p className='notice-msg center-text'>{it.L('Sorry, this feature is not available in your jurisdiction.')}</p>
        </div>

        <div className='gr-padding-10 table-body client_virtual invisible gr-parent'>
            <h3 className='gr-padding-10'>{it.L('Top up virtual account')}</h3>
            <div className='gr-row'>
                <div className='gr-2 gr-4-m'>
                    <img className='responsive' id='virtual_money_icon' src={it.url_for('images/pages/cashier/virtual_topup.svg')} />
                </div>
                <div className='gr-6 gr-12-m'>
                    <span>{it.L('You can top up your virtual account with an additional USD 10,000.00 if your balance falls below USD 1,000.00.')}</span>
                </div>
                <div className='gr-4 gr-12-m invisible'>
                    <a className='toggle button' id='VRT_topup_link'>
                        <span>{it.L('Get USD 10,000.00')}</span>
                    </a>
                </div>
            </div>
        </div>

        <div className='gr-padding-10 client_virtual invisible' />

        <div className='gr-padding-10 table-body'>
            <h3 className='gr-padding-10'>
                <span className='invisible normal_currency client_logged_out'>{it.L('Bank wire, credit card, e-wallet')}</span>
                <span className='invisible crypto_currency'>{it.L('Cryptocurrency')}</span>
            </h3>
            <div className='gr-row'>
                <div className='gr-2 gr-4-m'>
                    <a href={it.url_for('cashier/forwardws?action=deposit')} id='payment_methods'>
                        <img className='responsive' id='payment_methods_icon' src={it.url_for('images/pages/cashier/payment-methods.svg')} />
                    </a>
                </div>
                <div className='gr-6 gr-8-m'>
                    <span className='invisible normal_currency client_logged_out'>{it.L('Deposit or withdraw to your account via bank wire, credit card, or e-wallet.')}</span>
                    <span className='invisible crypto_currency'>{it.L('Manage the funds in your cryptocurrency account.')}</span>
                    &nbsp;
                    <a className='invisible normal_currency client_logged_out' href={it.url_for('cashier/payment_methods')} id='view_payment_methods'>
                        <span>{it.L('View available payment methods')}</span>
                    </a>
                    <CashierNote className='gr-hide-m' text={it.L('Sharing your payment method with another client is prohibited and can cause delays in your withdrawals.')} />
                </div>
                <CashierNote className='gr-12 gr-hide gr-show-m' text={it.L('Sharing your payment method with another client is prohibited and can cause delays in your withdrawals.')} />
                <DepositWithdraw show_upgrade id='deposit_btn_cashier' />
            </div>
        </div>

        <div className='gr-padding-10' />

        <div className='gr-padding-10 table-body payment-agent invisible' id='payment-agent-section'>
            <h3 className='gr-padding-10'>{it.L('Payment Agent')}</h3>
            <div className='gr-row'>
                <div className='gr-2 gr-4-m'>
                    <a href={it.url_for('cashier/payment_agent_listws')} id='payment_agent'>
                        <img className='responsive' id='payment_agent_icon' src={it.url_for('images/pages/cashier/payment-agents.svg')} />
                    </a>
                </div>
                <div className='gr-6 gr-8-m'>
                    <span>{it.L('For e-wallets or local currencies not supported by [_1].', it.website_name)}</span>
                    <CashierNote className='gr-hide-m' text={it.L('Withdrawal via payment agent is available only if you deposit exclusively via payment agent.')} />
                </div>
                <CashierNote className='gr-12 gr-hide gr-show-m' text={it.L('Withdrawal via payment agent is available only if you deposit exclusively via payment agent.')} />
                <DepositWithdraw is_payment_agent />
            </div>
        </div>
    </React.Fragment>
);

export default Cashier;
