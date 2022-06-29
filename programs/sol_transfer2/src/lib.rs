use anchor_lang::prelude::*;

declare_id!("FhbFwFVKe1NwzSxPSatgwACiRHpaeaccAA7rmqBpTc8R");

#[program]
pub mod sol_transfer2 {
    use super::*;

    pub fn sol_transfer(context: Context<TransferSol>, _lamports: u64) -> Result<()> {
        let from = &mut context.accounts.from;
        let to = &mut context.accounts.to;

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &from.key, &to.key, _lamports,
        );

        anchor_lang::solana_program::program::invoke(
            &ix,
            &[from.to_account_info(), to.to_account_info().clone()],
        ).expect("Error in transfering the sol ...");

        msg!("{} Sol transferd ... ", _lamports);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct TransferSol<'info> {
    #[account(mut, signer)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub from: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub to: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub system_program: AccountInfo<'info>,
}