class Api::AppointmentsController < ApplicationController

    before_action :set_app, only: [:show, :destroy, :update]

    def index
        render json: Appointment.all_and_more
    end

    def show
        render json: @appointment
    end

    def create
        @appointment = Appointment.new(app_params)
        if (@appointment.save)
            render json: @appointment
        else
            render json: {error: @appointment.errors}, status: 422
        end
    end

    def update
        if (@appointment.update(app_update_params))
            render json: @appointment
        else
            render json: {error: @appointment.errors}, status: 422
        end
    end

    def destroy
        render json: @appointment.destroy
    end

    private

    def set_app
        @appointment = Appointment.find(params[:id])
    end

    def app_params
        params.require(:appointment).permit(:date, :doctor_id, :patient_id)
    end

    def app_update_params
        params.require(:appointment).permit(:date)
    end

end
