class TasksController < ApplicationController
  protect_from_forgery
  attr_accessor :task_edit

  def show
  end

  def add_list
  end

  def create_list
  	@list = List.new(list_params)
    if @list.save
      render json: {data: "#{tasks_path}"}
    else
      render json: {data: "/tasks/add-list"}
    end
  end 

  def delete_list
  	Task.where(list: list_params[:title], :user_id => list_params[:user_id]).destroy_all
    List.where(title: list_params[:title], :user_id => list_params[:user_id]).destroy_all
  end 

  def delete
    Task.where(description: delete_params[:description], :user_id => delete_params[:user_id]).destroy_all
  end 

  def add
  end

  def create
  	@task = Task.new(task_params)
    Rails.logger.debug(task_params)
    if @task.save
      render json: {data: "#{tasks_path}"}
    else
      render json: {data: "/tasks/add-task"}
    end
  end

  def edit_id
    Rails.logger.debug('id!!!!')
    Rails.logger.debug(edit_id_params[:task_id])
    $task_edit_id = edit_id_params[:task_id]
  end

  def edit_view
    @task_edit_id = $task_edit_id
    Rails.logger.debug('view!!!!')
    Rails.logger.debug(@task_edit_id)
  end 

  def edit
    Rails.logger.debug('hi!!!!')
    Rails.logger.debug(edit_params)
    Rails.logger.debug(edit_params[:task_id])
    task_edit = Task.find(edit_params[:task_id])
    task_edit.update(description: edit_params[:description], priority: edit_params[:priority], list: edit_params[:list])
    render json: {data: "#{tasks_path}"}
  end

  private
  	def task_params 
      params.require(:task).permit(:user_id, :description, :priority, :list)
    end

    def edit_params 
      params.require(:task).permit(:user_id, :task_id, :description, :priority, :list)
    end

     def edit_id_params 
      params.require(:task).permit(:task_id)
    end

    def delete_params
      params.require(:task).permit(:description, :user_id)
    end

    def list_params
      params.require(:task).permit(:user_id, :title)
    end
end
