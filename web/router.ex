defmodule GroundStation.Router do
  use GroundStation.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", GroundStation do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/pids", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", GroundStation do
  #   pipe_through :api
  # end
end
