if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_budget_app", domain: "https://link-to-your-production-app.com/"
else
  Rails.application.config.session_store :cookie_store, key: "_budget_app"
end