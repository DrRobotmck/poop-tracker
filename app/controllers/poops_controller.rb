class PoopsController < ApplicationController
	before_action :authorized?, only: [:show]

  def show
  	@user = User.find(session[:user_id])
  	render json: @user.as_json(include: :poops)
  end

  def create
  	@user = User.find(session[:user_id])
  	@user.poops.create
  	render json: @user.as_json(include: :poops)
  end

  def login
  	user = User.find_by(username: params[:username])
  	if (user && user.pin == params[:pin].to_i)
  		session[:user_id] = user.id
  	elsif (!user)
  		user = User.create(username: params[:username], pin: params[:pin])
  	end
  	render json: user.id
  end

  def logout
  	session[:user_id] = nil
  	render status: 200, json: ''
  end
end
