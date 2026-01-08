# Replace the "Posted on" label text with "Last updated on" after rendering
module PostedToLastUpdated
  Jekyll::Hooks.register :posts, :post_render do |post|
    if post.output&.include?("Posted on")
      post.output = post.output.gsub("Posted on", "Last updated on")
    end
  end

  # Optional: also scan pages, in case the label appears elsewhere
  Jekyll::Hooks.register :pages, :post_render do |page|
    if page.output&.include?("Posted on")
      page.output = page.output.gsub("Posted on", "Last updated on")
    end
  end
end
