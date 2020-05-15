require "rails_helper"

feature "user visits homepage" do
	scenario "successfully", :js => true do
		include Capybara::DSL
		visit root_path
		expect(page).to have_content("Checklist")
	end
end