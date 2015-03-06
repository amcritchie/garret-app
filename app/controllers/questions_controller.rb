class QuestionsController < ApplicationController
  def create
    @question = Question.new(question_params)

    if @question.save
      redirect_to admin_path
    else
      render :new
    end
  end

  def destroy
    @question = Question.find(params[:id].to_i)
    @question.destroy
    render nothing: true
  end

  def question_params
    params.require(:question).permit(:body, :standards, :department, :key )
  end
end