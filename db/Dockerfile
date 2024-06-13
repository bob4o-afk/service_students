FROM mariadb:10.6.18

# Install MaxScale repository
RUN apt-get update && apt-get install -y curl gnupg
RUN curl https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | bash -s -- --mariadb-server-version="mariadb-10.6"

# Install MaxScale
RUN apt-get install -y maxscale

# Create a non-root user for MaxScale if it doesn't exist
RUN groupadd -r maxscale || true && useradd -r -g maxscale maxscale || true

# Copy MaxScale configuration file
COPY maxscale.cnf /etc/maxscale.cnf

# Expose MaxScale and MariaDB ports
EXPOSE 3306 4008

# Change ownership of MaxScale configuration file
RUN chown maxscale:maxscale /etc/maxscale.cnf

# Switch to non-root user
USER maxscale

# Start MaxScale
CMD ["maxscale", "-d"]
