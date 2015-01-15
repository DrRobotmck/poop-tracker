class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :logged_in?

  def index
  	if logged_in?
  		@user = User.find(session[:user_id])
  	end
  	render layout: 'application', text: ''
  end

  def logged_in?
  	session[:user_id]
  end

  def authorized?
  	unless session[:user_id].to_i == params[:id].to_i
  		redirect_to root_path
  	end
  end
end
