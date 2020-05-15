require "rails_helper"

feature "user edits a task" do
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

		click_on 'New Task'
		fill_in 'description', with: 'Do homework!'
		choose '3'


		select('None', :from => 'lists')

		click_on 'Add Task'

		click_on 'edit-task-0'

		fill_in 'description', with: 'Do homework NOW!'
		choose '5'
		select('None', :from => 'lists')

		click_button "Update Task"


		expect(page).to have_content("Do homework NOW!")
	end
end