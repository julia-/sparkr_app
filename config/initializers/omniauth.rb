OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV["facebook_app_id"], ENV["facebook_api_secret_key"],
  :scope => 'email,user_birthday'
end