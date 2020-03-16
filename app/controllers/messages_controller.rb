class MessagesController < ApplicationController
  before_action :set_group,  except: [:destroy]
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.json 
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージが空だよ！'
      render :index
    end
    
  end

  def destroy
    Message.destroy(params[:id])
    redirect_to root_path, notice: 'メッセージ削除完了！'
  end

private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
  
end
