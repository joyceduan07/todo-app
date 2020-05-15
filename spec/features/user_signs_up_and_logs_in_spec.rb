require "rails_helper"

feature "user signs up and logs in" do
	scenario "successfully", :js => true do
		include Capybara::DSL

		visit root_path

		click_on 'Sign Up'

		fill_in 'name', with: 'Bob McDonald'
		fill_in 'email', with: 'bob@mcdonald.com'
		fill_in 'password', with: 'asdfasdf'
		fill_in 'password_confirmation', with: 'asdfasdf'

		click_on 'submit'

		click_on 'Log In'

		fill_in 'email', with: 'bob@mcdonald.com'
		fill_in 'password', with: 'asdfasdf'


		click_on 'submit'


		expect(page).to have_content("No tasks!")
	end
end