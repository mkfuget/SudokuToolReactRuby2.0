module Api
    module V1
        class PuzzletypesController < ApplicationController
            protect_from_forgery with: :null_session,
            if: Proc.new { |c| c.request.format =~ %r{application/json} }
                  
            def index
                puzzletypes = Puzzletype.all
                
                render json: PuzzletypeSerializer.new(puzzletypes, options).serialized_json
            end

            def show
                puzzletype = Puzzletype.find_by(slug: params[:slug])
                
                render json: PuzzletypeSerializer.new(puzzletype, options).serialized_json
            end

            def create
                puzzletype = Puzzletype.new(puzzletype_params)

                if puzzletype.save
                    render json: PuzzletypeSerializer.new(puzzletype).serialized_json
                else
                    render json: {error: puzzletype.errors.messages}, status: 422
                end
            end

            def update
                puzzletype = Puzzletype.find_by(slug: params[:slug])
                
                if puzzletype.update(puzzletype_params)
                    render json: PuzzletypeSerializer.new(puzzletype, options).serialized_json
                else
                    render json: {error: puzzletype.errors.messages}, status: 422
                end


            end

            def destroy
                puzzletype = Puzzletype.find_by(slug: params[:slug])
                
                if puzzletype.destroy
                    head :no_content
                else
                    render json: {error: puzzletype.errors.messages}, status: 422
                end
            end

            private 

            def puzzletype_params
                params.require(:puzzletype).permit(:name, :description, :ruleset, :rules_description)
            end

            def options
                @options ||= { include: %i[puzzles]}
            end

        end
    end
end