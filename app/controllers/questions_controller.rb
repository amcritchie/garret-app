class QuestionsController < ApplicationController
  def create
    @question = Question.new(question_params)

    if @question.save
      redirect_to root_path
    else
      render :new
    end
  end

  def question_params
    params.require(:question).permit(:body, :standards, :sub_class )
  end
end