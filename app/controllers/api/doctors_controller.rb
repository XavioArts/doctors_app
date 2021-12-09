class Api::DoctorsController < ApplicationController
   
    before_action :set_doctor, only: [:show, :destroy]
    
    def index
        render json: Doctor.all, include: [:appointments, :patients]
    end

    def show
        render json: @doctor, include: [:appointments, :patients]
    end

    def create
        @doctor = Doctor.new(doc_params)
        if @doctor.save
            render json: @doctor, include: [:appointments, :patients]
        else
            render json: {error: @doctor.errors}, status: 422
        end
    end

    def update
        if (@doctor.update(doc_params))
            render json: @doctor, include: [:appointments, :patients]
        else
            render json: {error: @doctor.errors}, status: 422
        end
    end

    def destroy
        render json: @doctor.destroy
    end

    private

    def set_doctor
        @doctor = Doctor.find(params[:id])
    end

    def doc_params
        params.require(:doctor).permit(:name)
    end

end
