require "rails_helper"

describe Task do
	it "is invalid without a user"  do
		task = Task.new(user_id: nil)
		expect(task).not_to be_valid
	end

	it "is invalid without a description" do
		task = Task.new(description: nil)
		expect(task).not_to be_valid
	end 


	it "is invalid without a list" do
		task = Task.new(list: nil)
		expect(task).not_to be_valid
	end 

	it "is invalid without a priority" do
		task = Task.new(priority: nil)
		expect(task).not_to be_valid
	end 
end