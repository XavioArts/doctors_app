class Api::PatientsController < ApplicationController

    before_action :set_patient, only: [:show, :destroy]
    
    def index
        render json: Patient.all, include: [:appointments, :doctors]
    end

    def show
        render json: @patient, include: [:appointments, :doctors]
    end

    def create
        @patient = Patient.new(patient_params)
        if @patient.save
            render json: @patient, include: [:appointments, :doctors]
        else
            render json: {error: @patient.errors}, status: 422
        end
    end

    def destroy
        render json: @patient.destroy
    end

    private

    def set_patient
        @patient = Patient.find(params[:id])
    end

    def patient_params
        params.require(:patient).permit(:name)
    end

end
